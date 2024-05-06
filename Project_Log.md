>本文档用于记录项目开发过程中**遇到的问题和最终的解决方案**
>在书写这个文档的时候应该遵循以下格式：
>>日期——直接用输入法输入“日期”即可获得对应格式，如：2024年5月1日
>>[产生问题/汇报进度的模块] 例如：毫米波心率测量模块；数据库接口模块
>>[遇到的问题描述/开发进度展示]
>>汇报人
>
>此文档最终将用于撰写课程设计的报告，建议用于撰写报告的相关内容在记录开发Log的时候按照最终报告的格式进行书写，附上对应的展示图片并做好标题命名，**所有图片存储在文件夹fig中**

![SmartLearn](/fig4log/SmartLearn.png)

# 项目进度汇报
## Max
2024年5月5日
15点18分
完成小程序最初加载的页面
![loading](/fig4log/fig1.png)
页面路径：software_test\mini_program_test\pages\login\init_loading.vue

15点58分
完成在学习板块的背景渐变设计，详见software_test\mini_program_test\App.vue中的globalStyle内容

等待蓝牙连接页面完成半成品
页面路径：software_test\mini_program_test\pages\learn\wait4bt.vue

2024年5月6日
01点14分
完成API对话功能python的demo演示，初步决定智学对话学习助手的交互形式

## Jas
## Ljh
## Zy


# 开发遇到的问题＆解决方案
## 前端开发
2024年5月7日
出问题的静态页面总结：
- 页面“书架”的滚动和tabBar
- 页面“学完”的图标
- 蓝牙连接Ready后的问号位置对齐
- 复习的“历史”界面头顶消失

致命问题：
在codefun的view容器中有header标记的都无法编译出来

**解决方案**
问题原因：Header标识的容器组件错误，导致误删了状态栏以外的元素
解决方案：
1. 在codefun平台上更改header标识的容器组件
2. 在figma上对应进行修改
