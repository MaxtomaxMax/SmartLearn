import serial   #pip install pyserial

baud=1382400 #波特率
timeout=0.05 #50ms更新数据
ser=serial.Serial('COM7',baud, timeout)
# 定义数据处理函数
def process_data(data):
    # 在这里进行数据处理操作
    hex_string = ' '.join('{:02X}'.format(byte) for byte in data)
    print("Received data:", hex_string)

# 定义串口读取线程函数
def read_serial():
    while True:
        # 读取串口数据
        data = ser.read(10) #一次读取的字节数
        if data:
            process_data(data)

read_serial()