<template>
    <view class="flex-col page">
        <view class="flex-row justify-center items-center relative section_5">
            <image
                class="image_5 pos"
				@click="returnLearning"
                src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=b5edc2f97ef94958494bb7aa5b3f5719.png"
            />
            <view class="group">
                <text class="font text_2">
                    监测报告
                    <br />
                </text>
                <text class="text_3">{{ currentDate }}</text>
            </view>
        </view>
        <view class="flex-col group_2">
            <view class="flex-col">
                <view class="flex-row">
                    <image
                        class="image_6"
                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=8b67da0ec656083c8c44bbf097b87f98.png"
                    />
                    <view class="ml-8 flex-col items-start self-center">
                        <text class="text_4">{{NickName}}</text>
                        <text class="mt-6 font_2 text_5">{{ currentDate }}</text>
                    </view>
                    <!--<text class="ml-8 self-start font_2 text_6">14:23 - 17:05</text>-->
                </view>
                <view class="flex-row justify-between group_3 mt-13">
                    <view class="flex-col group_4">
                        <view class="flex-row">
                            <image
                                class="image_8"
                                src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=cf290e3198efc10f2e507f83756abc00.png"
                            />
                            <text class="text_7 ml-9">高专注学习</text>
                        </view>
                        <view class="mt-22 group_5">
                            <text class="text_8">{{focusLevel+"%"}}</text>
                            <text class="font_3 text_9">专注度</text>
                        </view>
                    </view>
                    
                </view>
            </view>
            <view class="mt-28 flex-col">
                <view class="flex-col section_6">
                    <text class="self-start font_3 text_11">压力分析</text>
                    <view class="flex-row items-center self-stretch group_6 mt-15">
                        <view class="flex-col justify-start items-center flex-1 relative section_7">
                            <image
                                class="image_9"
                                src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=fec8c1e4dd34dcef7813777a2f57dafc.png"
                            />
                            <view class="flex-col justify-start section_8 pos_2">
                                <view class="flex-col section_9">
                                    <view class="flex-col justify-start items-center self-stretch relative group_8">
                                        <view class="section_11"></view>
                                        <view class="flex-col section_10 pos_3">
                                            <view class="flex-col self-stretch">
                                                <view class="flex-row justify-between items-center group_9">
                                                    <image
                                                        class="image_10 image_11"
                                                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=ddaa84b9d50155ab3b9df25624e30fdd.png"
                                                    />
                                                    <text class="font_5">50</text>
                                                    <image
                                                        class="image_10 image_12"
                                                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=08833cbf7b934ed11ca2c5caa987cc50.png"
                                                    />
                                                </view>
                                                <view class="flex-row justify-evenly">
                                                    <text class="font_5">40</text>
                                                    <text class="font_5">60</text>
                                                </view>
                                            </view>
                                            <view class="mt-4 flex-row self-stretch group_10">
                                                <view class="flex-col self-start group_11">
                                                    <image
                                                        class="self-center image_13"
                                                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=cc7fa7510d932aeb4b69e817c8d6dc9c.png"
                                                    />
                                                    <text class="self-end font_5">30</text>
                                                    <text class="self-start font_5 text_14">20</text>
                                                </view>
                                                <image
                                                    class="self-center image_14"
                                                    src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=b8da177423b1dd706d714238195bf314.png"
                                                />
                                                <view class="flex-col self-start group_12">
                                                    <view class="flex-col">
                                                        <image
                                                            class="self-center image_13"
                                                            src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=723bbfcceec583c2eea7c9a301b8f998.png"
                                                        />
                                                        <text class="self-start font_5">70</text>
                                                    </view>
                                                    <view class="flex-row items-center group_13 mt-17">
                                                        <text class="font_5">80</text>
                                                        <image
                                                            class="ml-2 shrink-0 image_15"
                                                            src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=537a28775ac94f940b3ff3072a43c1a8.png"
                                                        />
                                                    </view>
                                                </view>
                                            </view>
                                            <view class="mt-4 flex-col self-stretch group_14">
                                                <view class="flex-row items-center">
                                                    <image
                                                        class="image_15"
                                                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=a87f478f9c1202f8a64edd5028227d64.png"
                                                    />
                                                    <text class="ml-2 font_5">10</text>
                                                </view>
                                                <view class="flex-row justify-end items-center relative group_15">
                                                    <text class="font_5">90</text>
                                                    <image
                                                        class="ml-2 image_15"
                                                        src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=e380f34fef4c84e097ea1de66eb2ee8a.png"
                                                    />
                                                </view>
                                            </view>
                                            <text class="mt-4 self-center font_4 text_15">压力值</text>
                                            <view class="mt-4 flex-row justify-between self-stretch divider">
                                                <text class="font_5">0</text>
                                                <text class="font_5">100</text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="flex-row justify-between self-stretch divider_2">
                                        <image
                                            class="image_13"
                                            src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=bc171f20980474f20e85f104dc41fa8d.png"
                                        />
                                        <image
                                            class="image_13"
                                            src="https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=044a7c3b009a3a25e626a2b0e1dc723d.png"
                                        />
                                    </view>
                                    <text class="self-center text_16">45%</text>
                                </view>
                            </view>
                        </view>
                        <view class="group_7 ml-19">
							<text class="text_12">
							      
							    <br />
							</text>
							<text class="text_12">
							      
							    <br />
							</text>
							<text class="text_12">
							      
							    <br />
							</text>
                            <text class="text_12">
                                压力适中
                                <br />
                            </text>
                            
                        </view>
                    </view>
                </view>
              
                
            </view>
			<view class="container">
			    <view class="stat-section">
			      <view class="stat-item">
			        <text class="stat-value">{{formattodayTime}}</text>
			        <text class="stat-label">学习时长</text>
			      </view>
			      <view class="stat-item">
			        <text class="stat-value">{{formatContinuedTime}}</text>
			        <text class="stat-label">连续时长</text>
			      </view>
			      <view class="stat-item">
			        <text class="stat-value">{{learnEffciency+"%"}}</text>
			        <text class="stat-label">学习效率</text>
			      </view>
			      <view class="stat-item">
			        <text class="stat-value">{{learnCount}}</text>
			        <text class="stat-label">今日学习次数</text>
			      </view>
			      <view class="stat-item">
			        <text class="stat-value"></text>
			        <text class="stat-label"></text>
			      </view>
			      <view class="stat-item">
			        <text class="stat-value">{{problemCount}}</text>
			        <text class="stat-label">题目数量</text>
			      </view>
			    </view>
			</view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            NickName:"yyf",
			currentDate:'',
			todaylearnTime:0,
			continuedTime:0,
			formatContinuedTime:null,
			formattodayTime:null,
			learnEffciency:0,
			learnCount:0,
			problemCount:0,
			focusLevel:0,
			
        };
    },
	
    created() {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            this.currentDate = `${yyyy}/${mm}/${dd}`;
    },
	computed:{
		formatContinuedTime(){
			const hours = String(Math.floor(this.continuedTime / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((this.continuedTime % 3600) / 60)).padStart(2, '0');
			const seconds = String(this.continuedTime % 60).padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		},
		formattodayTime(){
			const hours = String(Math.floor(this.todaylearnTime / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((this.todaylearnTime % 3600) / 60)).padStart(2, '0');
			const seconds = String(this.todaylearnTime % 60).padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		},
		
	},
    methods: {
		returnLearning(){
			uni.navigateTo({
			      url: '/pages/learn/learntiming' // 学习监测页面
			  });
		}
	},
};
</script>

<style scoped lang="css">
	.container {
	  margin-top: 20px;
	  padding: 20px;
	  background-color: #ffffff; /* 背景颜色 */
	  border-radius: 38.65rpx;
	}
	
	.stat-section {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  background-color: #ffffff; /* 淡黄色背景 */
	  padding: 10px;
	  border-radius: 10px; /* 圆角 */
	}
	
	.stat-item {
	  width: 32%; /* 三列布局 */
	  margin-bottom: 10px;
	}
	
	.stat-value {
	  font-size: 20px;
	  color: #333;
	  font-weight: bold;
	  display: block;
	  text-align: center;
	}
	
	.stat-label {
	  font-size: 14px;
	  color: #666;
	  text-align: center;
	  display: block;
	}

    .ml-11 {
        margin-left: 22.92rpx;
    }
    .mt-13 {
        margin-top: 27.08rpx;
    }
    .ml-9 {
        margin-left: 18.75rpx;
    }
    .mt-15 {
        margin-top: 31.25rpx;
    }
    .mt-5 {
        margin-top: 10.42rpx;
    }
    .mt-17 {
        margin-top: 35.42rpx;
    }
    .ml-19 {
        margin-left: 39.58rpx;
    }
    .mt-7 {
        margin-top: 14.58rpx;
    }
    .page {
        background-image: linear-gradient(180deg, #ffeacc 0%, #ffb238 100%);
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100vh;
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
    .section_5 {
        padding: 54.17rpx 41.67rpx 4.17rpx;
        background-color: #fedeac;
    }
    .image_5 {
        width: 41.67rpx;
        height: 41.67rpx;
    }
    .pos {
        position: absolute;
        left: 41.67rpx;
        bottom: 16.67rpx;
    }
    .group {
        line-height: 29.17rpx;
        text-align: center;
    }
    .font {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        color: #000000;
    }
    .text_2 {
        line-height: 35.42rpx;
    }
    .text_3 {
        color: #000000;
        font-size: 16.67rpx;
        font-family: ABeeZee;
        line-height: 29.17rpx;
    }
    .group_2 {
        padding: 20.83rpx 41.67rpx 0;
    }
    .image_6 {
        border-radius: 50%;
        width: 66.67rpx;
        height: 66.67rpx;
    }
    .text_4 {
        color: #000000;
        font-size: 29.17rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 21.23rpx;
    }
    .font_2 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 21.08rpx;
        font-weight: 600;
        color: #979797;
    }
    .text_5 {
        font-size: 22.92rpx;
    }
    .text_6 {
        margin-top: 41.67rpx;
        font-size: 22.92rpx;
    }
    .group_3 {
        padding: 0 16.67rpx;
    }
    .group_4 {
        margin: 8.33rpx 0;
    }
    .image_8 {
        width: 33.33rpx;
        height: 33.33rpx;
    }
    .text_7 {
        color: #000000;
        font-size: 33.33rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 31.44rpx;
    }
    .group_5 {
        margin-left: 4.17rpx;
    }
    .text_8 {
        color: #000000;
        font-size: 83.33rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 61.83rpx;
    }
    .font_3 {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        line-height: 29.17rpx;
        font-weight: 600;
        color: #1d2129;
    }
    .text_9 {
        color: #000000;
        line-height: 27.5rpx;
    }
    .image_7 {
        filter: drop-shadow(0rpx 4.17rpx 3.13rpx #00000040);
        width: 133.33rpx;
        height: 133.33rpx;
    }
    .section_6 {
        padding: 41.67rpx 25rpx 45.83rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_11 {
        line-height: 27.13rpx;
    }
    .group_6 {
        margin-right: 8.33rpx;
    }
    .section_7 {
        padding: 25rpx 0;
        border-radius: 208.33rpx;
        background-image: url('https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=7346d037eb298198524d0873133d4ac4.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 316.67rpx;
    }
    .image_9 {
        border-radius: 208.33rpx;
        width: 316.67rpx;
        height: 264.58rpx;
    }
    .section_8 {
        border-radius: 208.33rpx;
        background-image: url('https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=f1af219602235d90bc8ba48e9f6bc47f.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .pos_2 {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .section_9 {
        padding: 0 25rpx 12.5rpx;
        border-radius: 208.33rpx;
        background-image: url('https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=5634a5e3a30be675884838792e9a6095.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .group_8 {
        padding: 25rpx 0 200rpx;
    }
    .section_11 {
        background-color: #86909c;
        width: 2.08rpx;
        height: 9.75rpx;
    }
    .section_10 {
        padding: 0 4.17rpx;
        background-image: url('https://ide.code.fun/api/image?token=665a9f63602bd2001264d215&name=3d056c488e60962d474a40e5df91ed37.png');
        background-position: 0% 0%;
        background-size: 265.42rpx 207.98rpx;
        background-repeat: no-repeat;
    }
    .pos_3 {
        position: absolute;
        left: 0;
        right: 0;
        top: 26.13rpx;
    }
    .group_9 {
        padding-top: 12.5rpx;
    }
    .image_10 {
        width: 6.25rpx;
        height: 10.42rpx;
    }
    .image_11 {
        margin-left: 70.83rpx;
    }
    .image_12 {
        margin-right: 70.83rpx;
    }
    .font_4 {
        font-size: 20.83rpx;
        font-family: PingFang SC;
        line-height: 21.08rpx;
        color: #000000;
    }
    .text_10 {
        color: #979797;
        line-height: 19.29rpx;
    }
    .group_10 {
        padding-left: 12.5rpx;
    }
    .group_11 {
        width: 36.13rpx;
    }
    .image_13 {
        width: 8.33rpx;
        height: 8.33rpx;
    }
    .image_14 {
        margin-left: 41.67rpx;
        width: 56.25rpx;
        height: 85.42rpx;
    }
    .group_12 {
        margin-left: 62.5rpx;
    }
    .group_13 {
        padding-left: 20.83rpx;
    }
    .font_5 {
        font-size: 12.5rpx;
        font-family: PingFang SC;
        line-height: 9.27rpx;
        color: #86909c;
    }
    .text_14 {
        margin-top: 37.5rpx;
    }
    .image_15 {
        width: 10.42rpx;
        height: 4.17rpx;
    }
    .group_14 {
        height: 11.33rpx;
    }
    .group_15 {
        margin-top: -12.5rpx;
    }
    .text_15 {
        color: #4e5969;
        line-height: 19.23rpx;
    }
    .divider {
        padding-left: 41.67rpx;
        padding-right: 33.33rpx;
    }
    .divider_2 {
        padding: 0 29.17rpx;
    }
    .text_16 {
        margin-top: 16.67rpx;
        color: #1d2129;
        font-size: 50rpx;
        font-family: ABeeZee;
        line-height: 39rpx;
    }
    .group_7 {
        height: 338.67rpx;
    }
    .text_12 {
        color: #000000;
        font-size: 41.67rpx;
        font-family: PingFang SC;
        line-height: 41.67rpx;
    }
    .font_6 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 41.67rpx;
        color: #000000;
    }
    .text_13 {
        line-height: 41.67rpx;
    }
    .section_12 {
        padding: 41.67rpx 25rpx 22.92rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_17 {
        line-height: 27.35rpx;
    }
    .font_7 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 41.67rpx;
        color: #979797;
    }
    .text_18 {
        line-height: 23.27rpx;
    }
    .list {
        padding: 0 12.5rpx;
    }
    .list-item {
        background-color: #f4f2fc;
        border-radius: 8.33rpx;
    }
    .list-item:first-child {
        margin-top: 0;
    }
    .image_16 {
        border-radius: 8.33rpx;
        width: 150rpx;
        height: 100rpx;
    }
    .group_16 {
        margin-left: 25rpx;
    }
    .font_8 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 23.52rpx;
        font-weight: 600;
        color: #000000;
    }
    .text_19 {
        line-height: 23.6rpx;
    }
    .text_20 {
        line-height: 19.46rpx;
    }
    .image_17 {
        width: 14.58rpx;
        height: 22.92rpx;
    }
    .image_18 {
        margin-left: 41.67rpx;
        margin-right: 29.17rpx;
    }
    .section_13 {
        background-color: #ffffff;
        border-radius: 25rpx 25rpx 0 0;
        height: 20rpx;
    }
</style>
