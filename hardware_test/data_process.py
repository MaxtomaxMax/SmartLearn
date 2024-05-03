import serial   # pip install pyserial
import time # 用来记录时间戳
import struct # 用来解析十六进制字节串
import matplotlib.pyplot as plt # 绘制散点图

# ----------------------------- FRAME FORMAT ---------------------------------
#  The format can be adjusted to fit your particular application needs
# ,-----+-----+-----+------+------------+- - - -+-------------,
# | SOF | ID  | LEN | TYPE | HEAD_CKSUM | DATA  | DATA_CKSUM  |
# | 1   | 2   | 2   | 2    |      1     | ...   |      1      | <- size (bytes)

# 返回一个个封装帧
def create_frame():
    # 初始化封装帧和时间戳
    frame_dict = {}
    current_time = 0
    # 每次开始封装帧 都要找起始帧
    sof_receive=ser.read(1)  # 会从串口读取1个字节的数据，并返回一组字节串（例如"b'\x01\'"）
    # 进行十六进制转换,若不转换打印串口数据会观察不到“0A13”
    sof = '{:02X}'.format(sof_receive[0]) # format方法需要整数参数，所以要通过下表访问sof_receive并进行转换

    # 若找到了起始帧，则开始读取ID,LEN,TYPE(cate); 由串口测试数据看，ID和LEN并不是定值
    if sof == "01":
        cate_receive=ser.read(6)
        cate = ['{:02X}'.format(byte) for byte in cate_receive]

        # 判断是哪种帧类型
        if cate[4]=="0A" and cate[5]=="13": # 相位数据
            # 串口接收一帧中剩余的14个字节
            remain_receive=ser.read(14)
            remain = ['{:02X}'.format(byte) for byte in remain_receive]
            # 记录时间戳
            current_time = time.time()  # 获取当前帧时间戳
            frame_dict ={
                 'SOF': sof,
                 'ID':  cate[0:2],
                 'LEN': cate[2:4],
                 'TYPE': cate[4:6],
                 'HEAD_CK': remain[0],
                 'DATA': {'total_phase': remain[1:5],'breath_phase': remain[5:9],'heart_phase': remain[9:13]},
                 'DATA_CK':remain[13]
                }

        elif cate[4]=="0A" and cate[5]=="14": # 呼吸速率
            remain_receive = ser.read(6)
            remain = ['{:02X}'.format(byte) for byte in remain_receive]
            frame_dict ={
                'SOF': sof,
                'ID': cate[0:2],
                'LEN': cate[2:4],
                'TYPE': cate[4:6],
                'HEAD_CK': remain[0],
                'DATA': {'breath_rate': remain[1:5]},
                'DATA_CK': remain[5]
                }

        elif cate[4]=="0A" and cate[5]=="15": # 心跳速率
            remain_receive = ser.read(6)
            remain = ['{:02X}'.format(byte) for byte in remain_receive]
            frame_dict = {
                    'SOF': sof,
                    'ID': cate[0:2],
                    'LEN': cate[2:4],
                    'TYPE': cate[4:6],
                    'HEAD_CK': remain[0],
                    'DATA': {'heart_rate': remain[1:5]},
                    'DATA_CK': remain[5]
                }

        elif cate[4]=="0A" and cate[5]=="16": # 检测目标距离
            remain_receive = ser.read(10)
            remain = ['{:02X}'.format(byte) for byte in remain_receive]
            frame_dict = {
                    'SOF': sof,
                    'ID': cate[0:2],
                    'LEN': cate[2:4],
                    'TYPE': cate[4:6],
                    'HEAD_CK': remain[0],
                    'DATA': {'heart_rate': remain[1:9]},
                    'DATA_CK': remain[9]
                 }
        else:
            print("ERROR1")

        return frame_dict, current_time

    else:
        # print("EROOR2")
        return frame_dict, current_time

# 解析帧数据frame_dict。筛选出”0A13“的心率相位数据；将数据解析为浮点数后，将数存入列表data_list
def select_frame(frame_dict,data_list):
    flag = 0  #标志位，当有“0A13”封装帧时置1
    if frame_dict: # 若frame_dict为空，即没有成功封装帧
        if frame_dict['TYPE'] == ['0A', '13']:
            flag = 1
            # 读取心率相位数据（例如”["66","66","A2","41"]“）
            data_byte = frame_dict['DATA']['heart_phase']
            # 串口接收到的字节数据默认是小端序，即数据高位在高地址（后接收到），需要逆序为高位在左；
            # 再将列表转为字符串（例如”41A26666“）
            data = ''.join(reversed(data_byte))
            # 将字符串转为十六进制整数
            data_hex = int(data,16)
            # 将十六进制整数转换为字节串，’>I‘表示大端序的无符号整数
            data_dec = struct.pack('>I',data_hex)
            # 将字节串转为浮点数，'>f' 表示大端序的单精度浮点数
            data_float = struct.unpack('>f', data_dec)[0]
            # 浮点数保留小数点后1位
            data_round = round(data_float,3)
            # 存入列表data_list中
            data_list.append(data_round)
            return data_list, flag
        else: return data_list, flag
    else:
        return data_list, flag

# 更新时间戳列表和时间差值列表
def save_time(time_list, delta_list, current_time):
    # time_list和delta_list是列表，前者用来存储“0A13“（相位）数据的时间戳，后者delta_list用来存储（相位）时间戳的差值(秒为单位)
    # delta_list是后面用于计算HRV的关键

    # 若current_time不为0
    if current_time:
        if time_list: # 若列表不为空
            # 计算当前和上一个时间戳的差值
            delta = current_time - time_list[-1]
            # 列表增加现有时间戳，元素个数和已接收到的数据帧相同
            time_list.append(round(current_time,5))
            # 列表增加差值，元素个数应该比time_list少1。
            delta_list.append(round(delta,5))
        else: # 若列表为空
            time_list.append(current_time)  # 列表增加现有时间戳

# 异常值处理, 每次接收新数据将连续零信号去除，以便后续峰值检测
def check_zero(data_list, delta_list):
    m = len(data_list)  #data_list的临时长度
    # 长度大于等于2时，才能进行连零检测
    if(m >= 2):
        if(data_list[-1] == 0.0 and data_list[-2] == 0.0):
            # 删掉连零数据。只删一个以便于更好检测后续的连零数据
            data_list.pop()
            # 删掉连零时间戳
            delta_list.pop()

# 极大值搜索算法
def find_peak(data_list,time_list):
    # 注意这里传入的必须是异常值处理后的data_list, 通过比较一个值是否大于左右相邻值判断是否为峰值
    peak_pos = []  # 记录峰值的下标
    peak_list = [] # 记录峰值
    peak_time = [] # 记录峰值横坐标
    N = 0  # 搜索到的峰值数，每找到一个就加1
    m = len(data_list)-1 # 列表最后一个元素的索引（注意第1个元素的索引为“0”）
    # 从列表第二个元素遍历到倒数第二个元素
    for i in range(1,m):
        if data_list[i] >= data_list[i-1] and data_list[i] >= data_list[i+1]:
            N = N + 1
            peak_pos.append(i)
            peak_list.append(data_list[i])
            peak_time.append(time_list[i])
    return N, peak_pos, peak_list, peak_time

# 计算RR间隔（峰值之间的时间戳差值）, 注意这里传入的必须是异常值处理后的delta_list; N是峰值数; peak_pos存储峰值在data_list的下标
def delta_peak(delta_list, peak_pos, N):
    delta_time=[]
    # N个峰值，需计算出N-1个峰值时间戳差值
    for i in range(0,N-1):
        delta = 0
        min = peak_pos[i]
        max = peak_pos[i+1]
        # 将两个峰值之间所有的时间戳累加得到总时间戳
        for j in range(min,max):
            delta = delta + delta_list[j]
        delta_time.append(round(delta,3))
    return delta_time



# 计算HRV值


if __name__ == '__main__':
    ser = serial.Serial('COM7', 1382400, timeout=0.05)  # 50ms更新数据
    L = 0 # 初始化接收“0A13”心率相位帧个数
    i = 0 # 循环次数
    data_list = []
    time_list = []
    delta_list = []
    while L < 350:
        # 返回封装帧和时间戳
        frame, current_time = create_frame()
        i = i + 1  # 循环一次加一次
        # 筛选“0A13”,若有则flag = 1,从帧中提取心率相位数据
        data_list, flag = select_frame(frame, data_list)
        if flag:
            L = L + 1
            # print("iteration:",L)
            # print("frame:",frame)
            # print("current_time", current_time)
            # print("data_list:",data_list)

            # 更新时间戳列表和时间差值列表,每次都要
            save_time(time_list, delta_list, current_time)
            # print("updated time_list:",time_list)
            # print()
            # print("updated delta_list:",delta_list)

            # 异常值处理。检查当前data_list末尾是否有连0数值，若有，则需删除data_list和delta_list末尾无效值
            check_zero(data_list, delta_list)
            # print("check data_list：", data_list)
            # print()
            # print("check delta_list:", delta_list)
            # print("***************************************************************************************************")

    # 搜索data_list中所有极大值
    N, peak_pos, peak_list, peak_time = find_peak(data_list, time_list)
    # 算出所有peak之间的时间戳
    delta_time = delta_peak(delta_list, peak_pos, N)
    print("peak_number",N)
    print("delta_time:",delta_time)
    # plt.scatter(time_list, data_list, color='blue')
    plt.scatter(peak_time, peak_list, color='red')
    plt.plot(time_list, data_list, color='blue')
    plt.show()
