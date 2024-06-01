<template>
    <view class="flex-col page">
        <view class="flex-col flex-1 group">
			<view class="container">
			    <camera 
			       :key="cameraKey" id="myCamera"
			      device-position="front" 
			      flash="off"
			      style="width: 200px; height: 300px;"></camera>
			</view>
			<!--<view class="container">
				<view class="photo-display">
				      
				      <image v-if="lastPhoto" :src="lastPhoto" mode="aspectFit" style="width: 100%; height: 200px;"></image>
				    </view>
			</view>-->
            <view class="flex-col relative group_2 view">
                <view class="flex-col section_6">
                    <view class="flex-col self-stretch mt-29">
                        <!--<text class="self-center text_2" @click="startTimer">GO!</text>-->

                        <view class="flex-col self-stretch section_7 mt-29">
                            <view class="flex-row items-center">
                                <image
                                    class="image_3"
                                    src="../../static/ui_icon/bt_test.png"
                                />
                                <text class="font text_4 ml-5">蓝牙调试</text>
                            </view>
                            <view class="mt-10 grid">
                                <view class="flex-col justify-start items-center relative grid-item">
                                    <text class="font_2" @click="getservice">获取蓝牙服务</text>
                                </view>
                                <view class="flex-col justify-start items-center relative grid-item">
                                    <text class="font_2" @click="getcharacteristics">获取蓝牙特征值</text>
                                </view>
                                <view class="flex-col justify-start items-center relative grid-item">
                                    <text class="font_2" @click="charIdchange">监听特征值变化</text>
                                </view>
                                <view class="flex-col justify-start items-center relative grid-item">
                                    <text class="font_2"@click="closeBluetooth">关闭蓝牙</text>
                                </view>
                            </view>
                        </view>
						<view class="flex-col self-stretch section_7 mt-29">
						    
						    <view class="mt-10 grid">
						        <view class="flex-col justify-start items-center relative grid-item">
						            <text class="font_2" @click="startTimer">开始学习</text>
						        </view>
						        <view class="flex-col justify-start items-center relative grid-item">
						            <text class="font_2" @click="stopTimer">暂停计时</text>
						        </view>
						        <view class="flex-col justify-start items-center relative grid-item">
						            <text class="font_2" @click="continueTimer">继续学习</text>
						        </view>
						        <view class="flex-col justify-start items-center relative grid-item">
						            <text class="font_2"@click="endTimer">结束学习</text>
						        </view>
						    </view>
						</view>
                    </view>
                </view>
                <view class="flex-col section_8">
                    <view class="flex-row self-stretch">
                        <image
                            class="image_6"
                            src="../../static/ui_icon/totalTiming.png"
                        />
                        <text class="font text_5 ml-5">总计时</text>
                    </view>
                    <text class="mt-14 self-center text_6">{{formattedTime}}</text>
                </view>
                <view class="flex-col section_9">
                    <view class="flex-row group_3">
                        <image
                            class="image_6"
                            src="../../static/ui_icon/pressureValue.png"
                        />
                        <text class="ml-4 font text_7">压力值</text>
                    </view>
					
                    <view class="flex-row group_2 view_2">
                        <image
                            class="image_7"
                            src="../../static/ui_icon/HRV.png"
                        />
                        <text class="font_3 text_8 ml-7">HRV指标</text>
                    </view>
                    <view class="flex-row equal-division">
                        <view class="flex-col section_10 equal-division-item">
                            <text class="self-start font_4">SDNN</text>
                            <text class="mt-20 self-center font_5">{{SDNNnum}}</text>
                        </view>
                        <view class="ml-14 flex-col section_10 equal-division-item">
                            <text class="self-start font_4">RMSSD</text>
                            <text class="mt-20 self-center font_5">{{RMSSDnum}}</text>
                        </view>
                    </view>
                </view>
				
				<view class="flex-col section_9">
				    <view class="flex-row group_3">
				        <image
				            class="image_6"
				            src="/static/ui_icon/tired_icon.png"
				        />
				        <text class="ml-4 font text_7">疲劳</text>
				    </view>
				    <view class="flex-row group_4">
				        <image
				            class="image_7"
				            src="../../static/ui_icon/tiredTiming.png"
				        />
				        <text class="font_3 ml-7">疲劳计时</text>
				    </view>
				    
					<text class="mt-14 self-center text_6">{{tiredformatTime}}</text>
				    <view class="flex-row group_2 view_2">
						<image
						    class="image_7"
						    src="../../static/ui_icon/tiredBehav.png"
						/>
				        <text class="font_3 text_8 ml-7">疲劳行为</text>
				    </view>
				    <view class="flex-row equal-division">
				        <view class="flex-col section_10 equal-division-item">
				            <text class="self-start font_4">闭眼</text>
				            <text class="mt-20 self-center font_5">{{Closeeyecount}}</text>
				        </view>
				        <view class="ml-14 flex-col section_10 equal-division-item">
				            <text class="self-start font_4">哈欠</text>
				            <text class="mt-20 self-center font_5">{{Yawncount}}</text>
				        </view>
				    </view>
				</view>
				
				<view class="flex-col section_9">
				    <view class="flex-row group_3">
				        <image
				            class="image_6"
				            src="../../static/ui_icon/distract.png"
				        />
				        <text class="ml-4 font text_7">分心</text>
				    </view>
				    <view class="flex-row group_4">
				        <image
				            class="image_7"
				            src="../../static/ui_icon/distractTiming.png"
				        />
				        <text class="font_3 ml-7">分心计时</text>
				    </view>
					<text class="mt-14 self-center text_6">{{NoattformatTime}}</text>
				    <view class="flex-row group_2 view_2"> 
					    <image
					        class="image_7"
					        src="../../static/ui_icon/distractBehav.png"
					    />
				        <text class="font_3 text_8 ml-7">分心行为</text>
				    </view>
				    <view class="flex-row equal-division">
				        <view class="flex-col section_10 equal-division-item">
				            <text class="self-start font_4">玩手机</text>
				            <text class="mt-20 self-center font_5">{{SDNNnum}}</text>
				        </view>
				        <view class="ml-14 flex-col section_10 equal-division-item">
				            <text class="self-start font_4">离开座位</text>
				            <text class="mt-20 self-center font_5">{{NopersoninSeat}}</text>
				        </view>
				    </view>
				</view>
				
            </view>
			<!--<view class="container">-->
			<button class="end-button" @click="goTothisReport">查看学习监测报告</button>
			
        </view>
		
        
    </view>
</template>

<script>
export default {
    data() {
        return {
            connectedDeviceId: '',
            serviceId: '', // 假设你已知需要监听的服务ID
            services: [],
            characteristics: [],
            characteristicId: '', // 假设你已知需要监听的特征ID
            formattedTime: null,//计时显示时间
            elapsedTime: 0,
            allLearnTime: 0 ,// 存储单次学习时间，xxxx秒，需上云供数据库调用
			SDNNnum:0,
			RMSSDnum:0,
			SDNNlist:[],
			RMSSDlist:[],
			
			receivedData:[],
			shootTimer:null,
			upBtTimer:null,
			lastPhoto: null ,// 存储最后一张照片的路径
			cameraKey:0,
			tiredTime:0,//
			tiredformatTime:null, //疲劳计时显示时间
			NopersoninSeat:0, //离座计次
			NoattTime:0,//分心计时
			NoattformatTime:null,//分心计时显示时间
			Closeeyecount:0,//闭眼次数
			Yawncount:0,//打哈欠计次
			fatiguePlus:false,
        };
    },
    onLoad(options) {
           if (options.deviceId) {
               this.connectedDeviceId = options.deviceId;
               
           } else {
               console.error('No device ID passed to page');
               uni.showModal({
                   title: '蓝牙未连接成功:',
                   content: '未接收到设备ID，无法连接蓝牙设备',
                   showCancel: false
               });
           }
		 this.stopAutoTakePhoto(); // 清除定时器
		 this.checkAndRequestCameraPermission();
       },
	   
    computed: {
		
        formattedTime() {
            const hours = String(Math.floor(this.elapsedTime / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((this.elapsedTime % 3600) / 60)).padStart(2, '0');
            const seconds = String(this.elapsedTime % 60).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        },
		
		tiredformatTime(){
			const hours = String(Math.floor(this.tiredTime / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((this.tiredTime % 3600) / 60)).padStart(2, '0');
			const seconds = String(this.tiredTime % 60).padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		},
		
		NoattformatTime(){
			const hours = String(Math.floor(this.NoattTime / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((this.NoattTime % 3600) / 60)).padStart(2, '0');
			const seconds = String(this.NoattTime % 60).padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		},
    },
    methods: {
		
		 checkAndRequestCameraPermission() {
		      uni.getSetting({
		        success: res => {
		          if (!res.authSetting['scope.camera']) {
		            // 如果未授权，则请求相机权限
		            uni.authorize({
		              scope: 'scope.camera',
		              success: () => {
		                console.log('相机授权成功');
		                
		              },
		              fail: () => {
		                uni.showModal({
		                  title: '相机权限未授权',
		                  content: '请授权相机权限以使用相机功能',
		                  showCancel: false,
		                  success: modalRes => {
		                    if (modalRes.confirm) {
		                      // 
		                      uni.openSetting({
		                        success: (settingRes) => {
		                          
		                          if (settingRes.authSetting['scope.camera']) {
		                            console.log('用户在设置后授权了相机权限');
		                           
		                          } else {
		                            console.log('用户没有开启相机权限');
		                          }
		                        }
		                      });
		                    }
		                  }
		                });
		              }
		            });
		          } else {
		            console.log('相机已授权');
		            
		          }
		        }
		      });
		},
		
		takePhoto() {
		      const context = uni.createCameraContext();
		      context.takePhoto({
		        quality: 'high',
		        success: (res) => {
		          console.log('拍照成功:', res.tempImagePath);
				  //上传照片到服务器
		        this.uploadPhotoToServer1(res.tempImagePath);
		                // 调用上传到第二个服务器的函数
		        this.uploadPhotoToServer2(res.tempImagePath);
				  this.lastPhoto = res.tempImagePath;  // 更新照片路径
				  /*uni.showToast({
				            title: '拍照成功',
				            icon: 'success',
				            duration: 500 // 显示时长1000毫秒，即1秒
				          });*/
				  this.cameraKey++;  // 改变 key 值来强制重新渲染相机组件
		        },
		        fail: () => {
		          console.error('拍照失败');
				  uni.showToast({
				            title: '拍照失败',
				            icon: 'fail',
				            duration: 500 // 显示时长1000毫秒，即1秒
				          });
		        }
		      });
		},
		
		uploadPhotoToServer1(filePath) {
		      uni.uploadFile({
		        url: 'http://42.194.198.63:5000/smartlearn/fatigue-detection', // 
		        filePath: filePath,
		        name: 'file',
		        formData: {
		          'user': 'test'
		        },
		        success: (uploadFileRes) => {
		            console.log('上传服务器1成功:', uploadFileRes.data);
				    let responseData = JSON.parse(uploadFileRes.data);
					if (responseData.eyes === "fatigue" && responseData.mouth === "fatigue") {
					                console.log('眼睛和嘴巴都疲劳');
					                this.Closeeyecount++;
					                this.Yawncount++;
					                this.tiredTime += 5;  // 只加一次5分钟
					                
					 } else
				    { 
						 if (responseData.eyes === "fatigue") {
						    console.log('眼睛疲劳');
						    this.Closeeyecount++;
						    if (!(responseData.mouth === "fatigue")) {
						         this.tiredTime += 5;
						    }
						  } 
				        if (responseData.mouth === "fatigue") {
				            console.log('嘴巴疲劳');
				            this.Yawncount++;
				            if (!(responseData.eyes === "fatigue")) {
				                this.tiredTime += 5;
				            }
				        }
					}
				  /*let responseData = JSON.parse(uploadFileRes.data);
				    if(responseData.message==="No detection"){
				  	  this.NopersoninSeat++,
				  	  uni.showToast({
				  	            title: '离开座位',
				  	            icon: '次数加1',
				  	            duration: 500 // 显示时长1000毫秒，即1秒
				  	          });
				  	  console.log('No person in seat count:', this.NopersoninSeat);
				    }*/
				  
		        },
		        fail: () => {
		          console.error('上传服务器1失败');
		        }
		      });
		},
		// 上传到第二个服务器
		uploadPhotoToServer2(filePath) {
		  uni.uploadFile({
		    url: 'http://42.194.198.63:5000/smartlearn/human-detection', 
		    filePath: filePath,
		    name: 'file',
		    formData: {
		      'user': 'test'
		    },
		    success: (uploadFileRes) => {
		      console.log('上传到服务器2成功:', uploadFileRes.data);
			  let responseData = JSON.parse(uploadFileRes.data);
			  if(responseData.message==="No detection"){
				  this.NopersoninSeat++,
				  this.NoattTime=this.NoattTime+5,
				  uni.showToast({
				            title: '离开座位',
				            icon: '次数加1',
				            duration: 500 // 显示时长1000毫秒，即1秒
				          });
				  console.log('No person in seat count:', this.NopersoninSeat);
			  }
		    },
		    fail: () => {
		      console.error('上传到服务器2失败');
		    }
		  });
		},
		
		/*startAutoTakePhoto() {
		      if (!this.shootTimer) {
		        this.shootTimer = setInterval(this.takePhoto, 10000);
		      }
		},
		stopAutoTakePhoto() {
		      if (this.shootTimer) {
		        clearInterval(this.shootTimer);
		        this.shootTimer = null;
		      }
		},*/
         
        getservice() {
            const that = this;
            uni.getBLEDeviceServices({
                deviceId: that.connectedDeviceId,  // 在 uni-app 中通常不需要使用 `data` 属性
                success: function(res) {
                    console.log(res.services);
                    let serviceIds = res.services.map(service => service.uuid);
                    
                    that.services = res.services;  // 直接更新响应式数据
                    /*uni.showModal({
                        title: '获取服务成功:',
                        content: `服务列表：${JSON.stringify(that.services)}`,
                        showCancel: false
                    });*/
        			
                },
                fail: function(err) {
                    that.info = "获取设备服务失败！" + err.message; // `errMsg` 变成 `message` 在某些平台
					uni.showModal({
					    title: '获取服务失败:',
					    content: `服务列表：${JSON.stringify(that.services)}`,
					    showCancel: false
					});
                }
            });
		},
        //获取特征值
        getcharacteristics() {
            const that = this;
            if (that.services.length > 0) {
                let myuuid = that.services[0].uuid;//服务数组第一项服务的uuid
                uni.getBLEDeviceCharacteristics({
                    deviceId: that.connectedDeviceId,
                    serviceId: myuuid,
                    success: function(res) {
                        console.log(res.characteristics);
                        that.characteristics = res.characteristics.map(chr => ({
                            uuid: chr.uuid,
                            notify: chr.properties.notify,
                            write: chr.properties.write,
                            read: chr.properties.read
                        }));
						/*uni.showModal({
						    title: '获取特征值成功:',
						    content: `特征值列表：${JSON.stringify(that.characteristics)}`,
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
        	
        		   //const that = this;
        			 
        			if (!this.connectedDeviceId || !this.services.length || !this.characteristics) {
        			        uni.showModal({
        			            title: '错误',
        			            content: '设备未连接或服务特征未准备好',
        			            showCancel: false
        			        });
        			        return;
        			    }
        				const serviceId = this.services[0].uuid;
        				const characteristicId = this.characteristics[1].uuid;
        		    uni.notifyBLECharacteristicValueChange({
        		        state: true,
        		        deviceId: this.connectedDeviceId,  // 使用已保存的设备ID
        		        serviceId: serviceId,      // 假设你已经定义并初始化了 serviceId 数组
        		        characteristicId: characteristicId,  // 假设你已经定义并初始化了 characteristicId 数组
        		        success: function(res) {
        		            console.log('notifyBLECharacteristicValueChange success');
        		            
        					uni.showModal({
        					    title: '监听特征值变化:',
        					    content: `成功设置监听特征值变化！`,
        					    showCancel: false
        					});
						},	
							
						
        		        fail: function(err) {
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
        		    /*uni.onBLECharacteristicValueChange(function(res) {
        		        
        		        //that.receivedData=ab2hex(res.value);
						
						const hexData=ab2hex(res.value);
						//const timestamp = new Date(milliseconds).toISOString();
						//const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
						const timestamp =Date.now();
						this.receivedData.push({ data: hexData, time:timestamp });
        				// uni.showModal({
        				//     title: '接收到数据:',
        				//     content: `16进制数据为：${that.receivedData}`,
        				//     showCancel: false
        				// });
        		    });*/
					uni.onBLECharacteristicValueChange((res) => {
					    const hexData = ab2hex(res.value);
					    const timestamp = Date.now();
					    this.receivedData.push({ data: hexData, time: timestamp });
					});
        },
        
		uploadBtData(){
			    const dataToSend = this.receivedData;
		        if (dataToSend.length > 0) {
		            //console.log("Uploading data to the server: " + this.receivedData);
		            // 在这里添加你的上传逻辑，例如使用 uni.request
		            uni.request({
		                url: 'http://42.194.198.63:5000/smartlearn/pressure-detection',
		                method: 'POST',
		                data:dataToSend,
						header: {
						    'Content-Type': 'application/json', // 指定请求体格式为JSON
						},
		                success: (res) => {
		                    let data = res.data;
		                    this.RMSSDnum = parseInt(data.RMSSD);
		                    this.SDNNnum = parseInt(data.SDNN);
		                    
		                    // 显示返回结果的弹窗
		                    this.SDNNlist.push({ SDNN: this.SDNNnum });
		                    this.RMSSDlist.push({ RMSSD: this.RMSSDnum });
		                    
		                    console.log('SDNNlist:', this.SDNNlist);
		                    console.log('RMSSDlist:', this.RMSSDlist);
		                    
		                    uni.showModal({
		                        title: '服务器返回结果',
		                        content: JSON.stringify(res.data, null, 2),
		                        showCancel: false
		                    });
		                    
		                    this.receivedData = []; // 清空接收数据列表
		                    console.log('Data uploaded successfully', res);
		                },
		                fail: function(uploadErr) {
		                    console.error('Failed to upload data', uploadErr);
		                }
		            });
		    }
		},
		closeBluetooth() {
		        // 停止数据上传的定时器
		        if (this.upBtTimer) {
		            clearInterval(this.upBtTimer);
		            this.upBtTimer = null;
		            console.log('定时上传已停止');
		        }
		
		        // 关闭蓝牙适配器
		        uni.closeBluetoothAdapter({
		            success: (res) => {
		                console.log('蓝牙适配器关闭成功', res);
		                uni.showToast({
		                    title: '蓝牙已关闭',
		                    icon: 'success',
							duration:500,
		                });
		            },
		            fail: (err) => {
		                console.error('蓝牙适配器关闭失败', err);
		                uni.showModal({
		                    title: '关闭失败',
		                    content: '无法关闭蓝牙适配器，请重试',
		                    showCancel: false
		                });
		            }
		        });
		},
		
        startTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.elapsedTime = 0;
            this.timer = setInterval(() => {
                this.elapsedTime++;
            }, 1000);
			if (!this.shootTimer) {
			  this.shootTimer = setInterval(this.takePhoto, 5000);
			}
			if (!this.upBtTimer) {
			  this.upBtTimer = setInterval(this.uploadBtData, 60000);
			}
			
        },
        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        continueTimer() {
            if (!this.timer) {
                this.timer = setInterval(() => {
                    this.elapsedTime++;
                }, 1000);
            }
        },
        endTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.allLearnTime = this.elapsedTime;
            this.elapsedTime = 0;
			if (this.shootTimer) {
			  clearInterval(this.shootTimer);
			  this.shootTimer = null;
			}
        },
		goTothisReport(){
			uni.navigateTo({
			      url: '/pages/learn/thisTimeReport' // 本次学习报告页面
			  });
		}
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        // 清理蓝牙连接和监听器
        uni.offBLECharacteristicValueChange();
        if (this.isBluetoothAdapter) {
            uni.closeBluetoothAdapter();
        }
    },
	
	
};
</script>


<style scoped lang="css">
	
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
    
}
.photo-display {
  margin-top: 50px;
}
.timer-section {
  width: 90%;
  background-color: #FFF9E6;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.mt-29 {
    margin-top: 60.42rpx;
}
.ml-5 {
    margin-left: 10.42rpx;
}
.ml-7 {
    margin-left: 14.58rpx;
}
.page {
    background-color: #f4f2fc;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
.image_3 {
    width: 37.5rpx;
    height: 37.5rpx;
}
.group {
    overflow-y: auto;
}
.section_5 {
    background-color: #d9d9d900;
    height: 141.67rpx;
}
.group_2 {
    padding: 0 22.92rpx;
}
.view {
    margin-top: -83.33rpx;
}
.section_6 {
    padding: 12.5rpx 18.75rpx 27.08rpx;
    background-color: #d9d9d900;
}
.image_5 {
    border-radius: 10.42rpx;
    width: 127.08rpx;
    height: 27.08rpx;
}
.text_3 {
    color: #000000;
    font-size: 75rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 55.65rpx;
    letter-spacing: 8.33rpx;
}
.section_7 {
    padding: 25rpx 12.5rpx;
    background-color: #ffffff;
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
.section_8 {
    margin: 0 18.75rpx;
    padding: 25rpx 16.67rpx 41.67rpx;
    background-color: #ffffff;
    border-radius: 25rpx;
}
.image_6 {
    width: 33.33rpx;
    height: 33.33rpx;
}
.text_6 {
    color: #000000;
    font-size: 66.67rpx;
    font-family: ABeeZee;
    line-height: 48.27rpx;
}
.section_9 {
    margin: 25rpx 18.75rpx 0;
    padding: 25rpx 0 12.5rpx;
    background-color: #ffffff;
    border-radius: 25rpx 25rpx 0 0;
}
.group_3 {
    padding: 0 16.67rpx;
}
.font {
    font-size: 33.33rpx;
    font-family: PingFang SC;
    line-height: 30.83rpx;
    color: #000000;
}
.text_5 {
    line-height: 31rpx;
}
.text_4 {
    line-height: 30.71rpx;
}
.text_7 {
    line-height: 30.77rpx;
}
.group_4 {
    margin-top: 27.08rpx;
    padding: 0 20.83rpx;
}
.image_7 {
    width: 25rpx;
    height: 25rpx;
}
.font_3 {
    font-size: 25rpx;
    font-family: PingFang SC;
    line-height: 22.98rpx;
    color: #000000;
}
.image_8 {
    margin-top: 22.92rpx;
    width: 666.67rpx;
    height: 191.67rpx;
}
.view_2 {
    margin-top: 22.92rpx;
}
.text_8 {
    line-height: 22.85rpx;
}
.equal-division {
    margin: 22.92rpx 22.92rpx 0;
}
.font_4 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 15.46rpx;
    color: #000000;
}
.font_5 {
    font-size: 66.67rpx;
    font-family: PingFang SC;
    line-height: 49.46rpx;
    color: #000000;
}
.section_10 {
    flex: 1 1 295.83rpx;
}
.equal-division-item {
    padding: 25rpx 16.67rpx 66.67rpx;
    background-color: #ffeacc;
    border-radius: 25rpx;
    height: 195.83rpx;
}
.tab-bar {
    padding: 35.42rpx 0;
    background-color: #ffffff;
    box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
    backdrop-filter: blur(0rpx);
}
.section_11 {
    flex: 1 1 188rpx;
    padding: 16.67rpx 0 8.33rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.image_9 {
    width: 54rpx;
    height: 54rpx;
}
.font_2 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.29rpx;
    color: #000000;
}
.text_10 {
    color: #7451ff;
    line-height: 19.54rpx;
}
.section_12 {
    padding: 8.33rpx 0;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.font_6 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.29rpx;
    color: #a6a9b2;
}
.text_11 {
    line-height: 19.13rpx;
}
.text_9 {
    line-height: 19.21rpx;
}

.end-button {
	margin-top: 20px;
	margin-bottom: 20px;
    padding: 7px 20px;  
    font-size: 20px;  
    color: white;  
    background-image: linear-gradient(to right, #4e54c8, #8f94fb);
    border: none;  
    border-radius: 25px;  
    cursor: pointer;  
    outline: none;  
    transition: background-color 0.3s, box-shadow 0.3s; 
}

.end-button:hover {
    background-image: linear-gradient(to right, #8f94fb, #4e54c8); 
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
}

.end-button:active {
    box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
}
</style>