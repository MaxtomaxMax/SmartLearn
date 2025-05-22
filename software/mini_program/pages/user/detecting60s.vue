<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">	
		<view class="exit-container">
			<image class="exit-icon" src="../../static/ui_icon/exit.png" @click="exit"
			></image>
		</view>
        <text class="self-center text_2">“皆若空游无所依”</text>
        <image
            class="self-center image_5"
            src="../../static/ui_icon/baselineClock.png"
			 @click="sendDataToServer"
        />
		<view class="flex-col self-stretch section_7 mt-29">
		<view class="mt-10 grid">
		    <view class="flex-col justify-start items-center relative grid-item" @click="getservice">
		        <text class="font_22" >获取蓝牙服务</text>
		    </view>
		    <view class="flex-col justify-start items-center relative grid-item" @click="getcharacteristics">
		        <text class="font_22" >获取蓝牙特征值</text>
		    </view>
		    <view class="flex-col justify-start items-center relative grid-item" @click="charIdchange">
		        <text class="font_22" >监测（60S）</text>
		    </view>
		    <view class="flex-col justify-start items-center relative grid-item" @click="sendDataToServer">
		        <text class="font_22" >发送数据</text>
		    </view>
		</view>
		</view>
        <text class="self-center text_3">{{countdown}}</text>
		
    </view>
</template>
<!--  
.grid-item {
    padding: 12.5rpx 0;
    background-color: #ffffff;
    border-radius: 8.33rpx;
    box-shadow: 0rpx 4.17rpx 4.17rpx #00000040;
}
.font_22 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.29rpx;
    color: #000000;
}
-->
<script>
const db = uniCloud.database();
export default {
    components: {},
    props: {},
    data() {
        return {
			containerWidth: '0px',
			containerHeight: '0px',
			
			connectedDeviceid: '',
			serviceid: '', // 假设你已知需要监听的服务ID
			service: [],
			characteristic: [],
			characteristicid: '', // 假设你已知需要监听的特征ID
			
			BsreceivedData: [],
			countdown:60,
			
			BaseLineRMSSD:0,//得到服务器返回的BaseLineRMSSD测量结果，待上云之后需要同步到user页面显示
			BaseLineSDNN:0,//得到服务器返回的BaseLineSDNN测量结果，待上云之后需要同步到user页面显示
			
			userId:"",
			
		};
    },
	onLoad(options) {
		// 获取屏幕高度
		this.setContainerSize();
		
		// 获取用户ID
		this.userId = uni.getStorageSync("user_id");
		
	    if (options.deviceId) {
		    this.connectedDeviceid = options.deviceId;
		    /*uni.showModal({
			    title: '蓝牙已连接:',
			    content: `连接蓝牙设备ID：${this.connectedDeviceid}`,
			    showCancel: false
		   } );*/
	    } else {
		    console.error('No device ID passed to page');
		    uni.showModal({
			    title: '蓝牙未连接成功:',
			    content: '未接收到设备ID，无法连接蓝牙设备',
			    showCancel: false
		    });
	    }
	},

    methods: {
		exit(){
			// 返回上一个页面
			uni.navigateBack();
		},
		setContainerSize() {
			try {
				const res = uni.getSystemInfoSync();
				console.log(res);
				const screenWidth = res.screenWidth;
				// 屏幕高度要前去头部
				// #ifdef MP-WEIXIN
				const screenHeight = res.screenHeight - res.screenTop;
				// #endif
				// #ifdef H5
				const screenHeight = res.windowHeight;
				// #endif
		
				// 确认获取到了正确的宽度和高度
				if (screenWidth && screenHeight) {
					this.containerWidth = `${screenWidth}px`;
					this.containerHeight = `${screenHeight}px`;
				} else {
					console.error('获取 screenWidth 或 screenHeight 失败');
				}
			} catch (err) {
				console.error('获取系统信息失败', err);
			}
		},
		getservice() {
		    const that = this;
		    uni.getBLEDeviceServices({
		        deviceId: that.connectedDeviceid,  // 在 uni-app 中通常不需要使用 `data` 属性
		        success: function(res) {
		            console.log(res.service);
		            let serviceIds = res.services.map(service => service.uuid);
		            
		            that.service = res.services;  // 直接更新响应式数据
		            /*uni.showModal({
		                title: '获取服务成功:',
		                content: `服务列表：${JSON.stringify(that.service)}`,
		                showCancel: false
		            });*/
					
		        },
		        fail: function(err) {
		            that.info = "获取设备服务失败！" + err.message; // `errMsg` 变成 `message` 在某些平台
					uni.showModal({
					    title: '获取服务失败:',
					    content: `服务列表：${JSON.stringify(that.service)}`,
					    showCancel: false
					});
		        }
		    });
		},
		//获取特征值
		getcharacteristics() {
		    const that = this;
		    if (that.service.length > 0) {
		        let myuuid = that.service[0].uuid;//服务数组第一项服务的uuid
		        uni.getBLEDeviceCharacteristics({
		            deviceId: that.connectedDeviceid,
		            serviceId: myuuid,
		            success: function(res) {
		                console.log(res.characteristics);
		                that.characteristic = res.characteristics.map(chr => ({
		                    uuid: chr.uuid,
		                    notify: chr.properties.notify,
		                    write: chr.properties.write,
		                    read: chr.properties.read
		                }));
						/*uni.showModal({
						    title: '获取特征值成功:',
						    content: `特征值列表：${JSON.stringify(that.characteristic)}`,
						    showCancel: false
						});*/
		             	
		            },
		            fail: function(err) {
		                that.info = "特征值获取失败" + err.message;
						uni.showModal({
						    title: '获取特征值失败:',
						    content: `未能成功获取服务特征值！`,
						    showCancel: false
						});
		            }
		        });
		    } else {
		        that.info = "无可用服务";
		    }
		},
		
		//监听特征值变化
		charIdchange() {
			
				     const that = this;
					 that.countdown = 60;
					 const timer = setInterval(() => {
					   if (this.countdown > 0) {
					     this.countdown--;
					   } else {
						 
					     clearInterval(timer);
						 that.countdown = 60;
						 uni.showModal({
						     title: 'Baseline结果',
						     content: '你已完成今天的Baseline测量，开始学习吧~',
						     showCancel: false
						 });
					   }
					 }, 1000);
					if (!that.connectedDeviceid || !that.service.length || !that.characteristic) {
					        uni.showModal({
					            title: '错误',
					            content: '设备未连接或服务特征未准备好',
					            showCancel: false
					        });
					        return;
					    }
						//const servicid = that.service[0].uuid;
						//const characteristicid = that.characteristic[1].uuid;
						const serviceid = that.service[0].uuid;
						const characteristicid = that.characteristic[1].uuid;
				    uni.notifyBLECharacteristicValueChange({
				        state: true,
						 deviceId: this.connectedDeviceid,
						        
				        //deviceid: this.connectedDeviceid,  // 使用已保存的设备ID
				        serviceId: serviceid,      // 假设你已经定义并初始化了 serviceId 数组
				        characteristicId: characteristicid,  // 假设你已经定义并初始化了 characteristicId 数组
				        success: function(res) {
				            console.log('notifyBLECharacteristicValueChange success');
				            that.info = "成功";
							uni.showModal({
							    title: '监听特征值变化:',
							    content: `成功设置监听特征值变化！`,
							    showCancel: false
							});
							console.log(res);
				        },
				        fail: function(err) {
				            that.info = "失败：" + err.message;  // 注意uni-app在某些平台上错误对象的属性可能是message
							uni.showModal({
							    title: '监听特征值变化:',
							    content:`未成功设置监听特征值变化！错误信息：${err.errMsg}` ,
							    showCancel: false
							});
				        }
				    });
				
				    // 函数将 ArrayBuffer 转换为十六进制字符串
				    function ab2hex(buffer) {
				        var hexArr = Array.prototype.map.call(
				            new Uint8Array(buffer),
				            function(bit) {
				                return ('00' + bit.toString(16)).slice(-2);
				            }
				        );
				        return hexArr.join('');
				    }
				
				    // 监听特征值变化
				    uni.onBLECharacteristicValueChange(function(res) {
				        
				        const hexData=ab2hex(res.value);
						//const timestamp = new Date(milliseconds).toISOString();
						//const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
						const timestamp =Date.now();
						that.BsreceivedData.push({ data: hexData, time:timestamp });
						/*uni.showModal({
						    title: '接收到数据:',
						    content: `16进制数据为：${hexData}`,
						    showCancel: false
						});*/
				    });
		},
		//发送数据到云服务器
		sendDataToServer() {
			const dataToSend = this.BsreceivedData;
			console.log('发送');
			
			// 如果有baseline就更新
			// db.collection("baseline")
			// 	.where({
			// 		userId: this.userId
			// 	}).get()
			// 	.then(res=>{
			// 		console.log(res);
			// 		if (res.result.data.length != 0){
			// 			// 确实需要更新baseline
			// 			let bsId = res.result.data[0]._id
			// 			db.collection("baseline").doc(bsId).update({
			// 				RMSSD: 130,
			// 				SDNN: 65
			// 			}).then(res=>{
			// 				console.log(res);
			// 			}).catch(err=>{
			// 				console.log(err);
			// 			});
			// 		}
			// 	}).catch(err=>{
			// 		console.log(err);
			// 	});
			
				
			if (true) {
				uni.request({
					url: 'http://42.193.218.247:5000/smartlearn/pressure-detection', // 替换为你的云服务器地址
					method: 'POST',
					data:dataToSend,
					header: {
						'Content-Type': 'application/json', // 指定请求体格式为JSON
					},
					success: (res) => {
						let data = res.data;
						this.BaseLineRMSSD=parseInt(data.RMSSD),
						this.BaseLineSDNN=parseInt(data.SDNN)
						 // 显示返回结果的弹窗
						uni.showModal({
							title: '服务器返回结果',
							content: JSON.stringify(res.data, null, 2),
							//content:'服务器返回结果:\n' + JSON.stringify(res.data, null, 2) + 
									//'\n\n已发送的数据:\n' + JSON.stringify(dataToSend, null, 2),
							showCancel: false
						});
						this.BsreceivedData = [];
						
						// 如果有baseline就更新
						db.collection("baseline")
							.where({
								userId: this.userId
							}).get()
							.then(res=>{
								console.log(res);
								if (res.result.data.length != 0){
									// 确实需要更新baseline
									let bsId = res.result.data[0]._id
									db.collection("baseline").doc(bsId).update({
										RMSSD: this.BaseLineRMSSD,
										SDNN: this.BaseLineSDNN
									}).then(res=>{
										console.log(res);
									}).catch(err=>{
										console.log(err);
									});
								} else{
									// 如果没有baseline接收数据上云数据库
									db.collection("baseline").add({
										userId: this.userId,
										RMSSD: this.BaseLineRMSSD,
										SDNN: this.BaseLineSDNN,
									}).then(res=>{
										console.log(res);
									}).catch(err=>{
										console.log(err);
									})
								}
							}).catch(err=>{
								console.log(err);
							});
					},
					fail: (err) => {
						uni.showModal({
							title: '服务器返回结果:',
							content: `无法发送数据到服务器，请稍后再试。错误信息：${err.errMsg}`,
							showCancel: false
						});
					},
					complete() {
						console.log('发送完成');
					}
				});
			}
		},
	},
};
</script>

<style scoped lang="css">
.exit-container{
	padding: 30rpx;
}
.exit-icon{
	width: 41.67rpx;
	height: 41.67rpx;
}
.ml-11 {
    margin-left: 22.92rpx;
}
.page {
    padding-bottom: 466.67rpx;
    background-image: linear-gradient(180deg, #ffebcc 0%, #f4f2fc 61%);
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
}
.section_7 {
    padding: 50rpx 12.5rpx;
    background-color: #f4f2fc 61%;
    border-radius: 25rpx;
}
.grid {
    margin: 0 12.5rpx;
    height: 100rpx;
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 18.67rpx;
    column-gap: 18.67rpx;
}
.grid-item {
    padding: 12.5rpx 0;
    background-color: #ffffff;
    border-radius: 8.33rpx;
    box-shadow: 0rpx 4.17rpx 4.17rpx #00000040;
}
.font_22 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.29rpx;
    color: #000000;
}
.section {
    padding: 12.5rpx 33.33rpx;
    background-color: #ffffff;
}
.text {
    color: #000000;
    font-size: 25rpx;
    font-family: Inter;
    line-height: 18.73rpx;
}
.image {
    width: 127.38rpx;
    height: 39.58rpx;
}
.section_2 {
    padding: 22.92rpx 12.5rpx 22.92rpx 33.33rpx;
    background-color: #ffffff;
}
.image_2 {
    width: 18.75rpx;
    height: 35.42rpx;
}
.section_3 {
    padding: 12.5rpx 25rpx;
    background-color: #ffffff;
    border-radius: 38.65rpx;
    height: 66.67rpx;
    border-left: solid 1.04rpx #e9e9e9;
    border-right: solid 1.04rpx #e9e9e9;
    border-top: solid 1.04rpx #e9e9e9;
    border-bottom: solid 1.04rpx #e9e9e9;
}
.image-wrapper {
    width: 39.58rpx;
}
.image_4 {
    width: 39.58rpx;
    height: 14.58rpx;
}
.section_4 {
    background-color: #e9e9e9;
    width: 1.04rpx;
    height: 41.67rpx;
}
.image_3 {
    width: 37.5rpx;
    height: 37.5rpx;
}
.text_2 {
    margin-top: 141.67rpx;
    color: #000000;
    font-size: 50rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 47.21rpx;
    letter-spacing: 8.33rpx;
}
.image_5 {
    margin-top: 141.67rpx;
    filter: drop-shadow(0rpx 20.83rpx 4.17rpx #ffeacc);
    border-radius: 50%;
    width: 416.67rpx;
    height: 416.67rpx;
}
.text_3 {
    margin-top: 80rpx;
    color: #000000;
    font-size: 100rpx;
    font-family: ABeeZee;
    line-height: 71.9rpx;
    letter-spacing: 8.33rpx;
}
</style>
