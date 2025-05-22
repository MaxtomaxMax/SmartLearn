# YOLOv5 🚀 by Ultralytics, AGPL-3.0 license
"""Perform test request."""

# 以下用python模拟云数据库的http请求，要求云服务器必须同时运行
# 测试图片是jasmine.jpg, 实际项目中用后端用js语言控制esp32cam或手机摄像头捕捉图片。
import pprint

import requests

DETECTION_URL = "http://workspace.featurize.cn:62938/v1/object-detection/yolov5s"
# IMAGE = "jasmine.jpg"

# 更新路径
IMAGE = r"software_test\Yolo_flask_test\jasmine.jpg"

# Read image
with open(IMAGE, "rb") as f:
    image_data = f.read()

response = requests.post(DETECTION_URL, files={"image": image_data}).json()

pprint.pprint(response)