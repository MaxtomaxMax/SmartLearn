# 使用海邻科的毫米波模块LD6002及其测试底板（底板上包括TTL转usb模块）
# 通过usb连接模块底板和电脑，可进行如下串口读取 
# 注意，在实际项目中，需要将毫米波模块数据传至MCU, 再通过蓝牙模块传输数据到手机，最后通过http(s) API将数据传到后端处理

import serial   #pip install pyserial

ser=serial.Serial('COM7',1382400, timeout=0.05) #50ms更新数据
# 定义数据处理函数
def process_data(data):
    # 在这里进行数据处理操作
    hex_string = ' '.join('{:02X}'.format(byte) for byte in data)
    print("Received data:", hex_string)


# 定义串口读取线程函数
def read_serial():
    while True:
        # 读取串口数据
        data = ser.read(30) #一次读取的字节数
        if data:
            process_data(data)

read_serial()
