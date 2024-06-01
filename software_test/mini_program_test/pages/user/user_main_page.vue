<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
		<view class="flex-col justify-start relative header">
			<view class="flex-row justify-between group">
				<image
					class="image_2"
					src="../../static/ui_icon/msg.png"
				/>
				<image
					class="image_3"
					src="../../static/ui_icon/setting.png"
					@click="enterSetting"
				/>
			</view>
		</view>
		<view class="flex-col group_18">
			<view class="flex-row group_3">
				<image
					class="shrink-0 self-center image_4"
					:src=avatarUrl
				/>
				<view class="flex-col items-start flex-1" style="align-self: center; padding-left: 30rpx;">
					<text class="text">{{username}}</text>
					<text class="font text_2 mt-9">{{signature}}</text>
				</view>
			</view>

			<view class="flex-col section">
				<view class="flex-row justify-between items-center section_2">
					<view class="flex-row items-center">
						<image
							class="shrink-0 image_5"
							src="../../static/ui_icon/time.png"
						/>
						<text class="font_2 text_7 ml-11">净学习时长</text>
					</view>
					<view class="group_6">
						<text class="font_3 text_8">{{ learninghours }}</text>
						<text class="font_4 text_10">小时</text>
						<text class="font_3 text_9">{{ learningminutes }}</text>
						<text class="font text_11">分钟</text>
					</view>
				</view>
			</view>
			<view class="baseline-container">
				<text class="self-start font_33 text_31"
					  >BASELINE-MONITOR·平静检测</text
				>
				<view
					class="mt-14 flex-row justify-between items-center self-stretch section_30"
					@click="goTodetect"
				>
					<view class="flex-row items-center">
						<view class="flex-row items-center">
							<view class="section_31"></view>
							<image
								class="image_34 ml-5"
								src="../../static/ui_icon/baseline.png"
							/>
						</view>
						<view class="ml-18 flex-col items-center">
							<text class="font_34 text_32">BASELINE-MONITOR</text>
							<text class="mt-12 font_33">平静值检测</text>
						</view>
					</view>
					<image
						class="image_35"
						src="../../static/ui_icon/baseline_enter.png"
					/>
				</view>
			</view>
		</view>

		<view class="grid">
			<view class="flex-col grid-item">
				<view class="flex-row items-center self-stretch">
					<image
						class="image_6"
						src="../../static/ui_icon/query.png"
					/>
					<text class="ml-12 font_5 text_26">答疑</text>
				</view>
				<view class="self-start group_1 mt-9">
					<text class="font_4">2829</text>
					<text class="font_6">
						个答疑
						<br />
					</text>
					<text class="font_6">留在了26本书上</text>
				</view>
			</view>
			<view class="flex-col grid-item">
				<view class="flex-row items-center self-stretch">
					<image
						class="image_6"
						src="../../static/ui_icon/reviewMainPage.png"
					/>
					<text class="ml-12 font_5 text_1">复习</text>
				</view>
				<view class="self-start group_8 mt-9">
					<text class="font_4">{{ reviewedcount }}</text>
					<text class="font_6">
						条已复习
						<br />
					</text>
					<text class="font_6">{{ unreviewcount }}条未复习</text>
				</view>
			</view>
		</view>
		<view class="flex-col section_3">
			<view class="flex-row justify-between items-center section_4">
				<view class="flex-row items-center" @click="goDetectRecord">
					<image
						class="shrink-0 image_5"
						src="../../static/ui_icon/report.png"
					/>
					<text class="font_2 text_16 ml-11">监测报告</text>
				</view>
				<view class="group_9">
					<text class="font_4">已监测</text>
					<text class="font_7">{{ detectcount }}</text>
					<text class="font_4">
						次
						<br />
					</text>
					<text class="font_4">平均压力值</text>
					<text class="font_7">{{ avestress }}%</text>
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
            containerWidth: '0px',
            containerHeight: '0px',
            
            learninghours: 5,
            learningminutes: 26,
            finishedcount: 19,
            studyingcount: 17,
            detectcount: 526,
            avestress: 33,
            reviewedcount: 333,
            unreviewcount: 424,
			
			userId: "",
			avatarUrl:"../../static/ui_icon/avatar.png",
			username: "未命名用户",
			signature:"",
        };
    },
    onLoad() {
		// 获取屏幕高度
    	this.setContainerSize();
		
		// 获取用户ID
		this.userId = uni.getStorageSync("user_id");
		
		
    },
	
	onShow() {
		// 获取头像地址
		this.avatarUrl = uni.getStorageSync("avatar_url");
		console.log("头像地址:", this.avatarUrl);
		
		// 获取用户名和个性签名
		this.username = uni.getStorageSync("username");
		this.signature = uni.getStorageSync("signature");
	},
    methods: {
		goDetectRecord(){
			uni.navigateTo({
				url:"/pages/user/detect_record",
			});
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
        enterSetting() {
            uni.navigateTo({
                url: "/pages/user/settings", // 目标页面的路径
            });
        },
        goToReportPage() {
            uni.navigateTo({
                url: "/pages/user/detectreport", // 目标页面的路径
            });
        },
        goTodetect() {
            uni.navigateTo({
                url: "/pages/user/bslinedetect", // 目标页面的路径
            });
        },
    },
};
</script>

<style scoped lang="css">
    .baseline-container{
        padding: 30rpx 0 0 0;
    }
    .ml-11 {
        margin-left: 22.92rpx;
    }
    .mt-9 {
        margin-top: 18.75rpx;
    }
    .page {
        background-color: #f4f2fc;
        border-radius: 58.33rpx;
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .group_2 {
        padding-bottom: 77.08rpx;
        overflow-y: auto;
    }
    .header {
        margin-top: -91.67rpx;
        padding: 120rpx 0 22.92rpx;
    }
    .group {
        padding-left: 41.67rpx;
        padding-right: 41.67rpx;
    }
    .image_2 {
        width: 41.67rpx;
        height: 41.67rpx;
    }
    .image_3 {
        width: 50rpx;
        height: 41.67rpx;
    }
    .group_18 {
        margin: 10.42rpx 41.67rpx 0 41.67rpx;
    }
    .group_3 {
        align-items: center;
        padding-bottom: 25rpx;
    }
    .image_4 {
        border-radius: 50%;
        width: 100rpx;
        height: 100rpx;
    }

    .text {
        margin-left: 5.21rpx;
        color: #000000;
        font-size: 29.17rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 21.23rpx;
    }
    .section {
        padding: 16.67rpx 0 16.67rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .section_2 {
        padding: 37.5rpx 41.67rpx 37.5rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .image_5 {
        border-radius: 50%;
        width: 50rpx;
        height: 50rpx;
    }
    .font_2 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 25rpx;
        color: #000000;
    }
    .text_3 {
        line-height: 23.38rpx;
    }
    .group_5 {
        margin-right: 27.17rpx;
        line-height: 24.27rpx;
        height: 26.38rpx;
    }
    .font_3 {
        font-size: 33.33rpx;
        font-family: PingFang SC;
        line-height: 25rpx;
        color: #979797;
    }
    .text_4 {
        line-height: 24.27rpx;
    }
    .text_7 {
        line-height: 23.08rpx;
    }
    .group_6 {
        margin-right: 24.71rpx;
        line-height: 24.73rpx;
        height: 26.4rpx;
    }
    .text_8 {
        line-height: 24.73rpx;
    }
    .font_4 {
        font-size: 20.83rpx;
        font-family: PingFang SC;
        line-height: 25rpx;
        color: #979797;
    }
    .text_10 {
        line-height: 18.73rpx;
    }
    .text_9 {
        line-height: 23.79rpx;
    }
    .text_12 {
        line-height: 23.25rpx;
    }
    .group_7 {
        margin-right: 24.06rpx;
        line-height: 24.73rpx;
        height: 26.46rpx;
    }
    .text_13 {
        line-height: 24.73rpx;
    }
    .grid {
        margin: 41.67rpx 41.67rpx 0 41.67rpx;
        height: 180rpx;
        display: grid;
        grid-template-rows: repeat(1, minmax(0, 1fr));
        grid-template-columns: repeat(2, minmax(0, 1fr));
        row-gap: 35.33rpx;
        column-gap: 35.33rpx;
    }

    .image_6 {
        border-radius: 50%;
        width: 48rpx;
        height: 48rpx;
    }
    .font_5 {
        font-size: 25rpx;
        font-family: PingFang SC;
        letter-spacing: 2.5rpx;
        line-height: 25rpx;
        color: #000000;
    }
    .text_25 {
        line-height: 23.25rpx;
    }
    .group_8 {
        line-height: 20.83rpx;
    }
    .font_6 {
        font-size: 16.67rpx;
        font-family: PingFang SC;
        line-height: 20.83rpx;
        color: #979797;
    }
    .text_15 {
        line-height: 23.29rpx;
    }
    .grid-item {
        padding: 25rpx 25.67rpx 28.31rpx 25.67rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_26 {
        line-height: 23.35rpx;
    }
    .group_1 {
        line-height: 20.83rpx;
    }
    .text_1 {
        line-height: 23.17rpx;
    }
    .section_3 {
        margin: 41.67rpx 41.67rpx 0 41.67rpx;
        padding-top: 16.67rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .section_4 {
        padding: 24.69rpx 41.67rpx 14.9rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_16 {
        line-height: 23.15rpx;
    }
    .group_9 {
        margin-right: 7.52rpx;
        text-align: center;
        width: 173.63rpx;
        height: 85.42rpx;
    }
    .font_7 {
        font-size: 33.33rpx;
        font-family: PingFang SC;
        line-height: 39.58rpx;
        color: #979797;
    }
    .section_5 {
        padding: 25.17rpx 41.67rpx 21.29rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_17 {
        line-height: 23.02rpx;
    }
    .group_10 {
        margin-right: 22.6rpx;
        line-height: 25rpx;
        text-align: center;
        height: 78.54rpx;
    }
    .tab-bar {
        padding: 52.17rpx 60.5rpx 43.65rpx 66.75rpx;
        background-color: #ffffff;
        border-radius: 58.33rpx;
        box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
        backdrop-filter: blur(0rpx);
    }
    .group_11 {
        height: 77.06rpx;
    }
    .image_7 {
        width: 54rpx;
        height: 54rpx;
    }
    .font {
        font-size: 20.83rpx;
        font-family: PingFang SC;
        line-height: 20.83rpx;
        color: #979797;
    }
    .text_14 {
        line-height: 19.4rpx;
    }
    .text_11 {
        line-height: 19.1rpx;
    }
    .text_6 {
        line-height: 19.08rpx;
    }
    .text_5 {
        line-height: 19.27rpx;
    }
    .text_2 {
        font-weight: 600;
        line-height: 21.85rpx;
    }
    .font_8 {
        font-size: 20.83rpx;
        font-family: PingFang SC;
        line-height: 20.83rpx;
        color: #a6a9b2;
    }
    .text_18 {
        line-height: 19.21rpx;
    }
    .group_12 {
        height: 77.08rpx;
    }
    .text_19 {
        line-height: 19.44rpx;
    }
    .group_13 {
        height: 76.98rpx;
    }
    .text_20 {
        line-height: 19.13rpx;
    }
    .group_14 {
        height: 77.1rpx;
    }
    .text_21 {
        color: #7451ff;
        line-height: 19.42rpx;
    }
    .list {
        margin: 27.08rpx 0 -95.83rpx;
    }
    .list-item {
        padding: 33.33rpx 41.67rpx;
        background-color: #ffffff;
    }
    .image_35 {
        margin-right: 41.67rpx;
        width: 18.75rpx;
        height: 25rpx;
    }
    .list-item:first-child {
        margin-top: 0;
    }
    .font_33 {
        font-size: 20.83rpx;
        font-family: PingFang SC;
        line-height: 19.31rpx;
        color: #000000;
    }
    .text_31 {
        line-height: 19.29rpx;
    }
    .section_30 {
        background-color: #f4f2fc;
        border-radius: 8.33rpx;
    }
    .section_31 {
        background-image: linear-gradient(180deg, #ff9328 0%, #7451ff 100%);
        border-radius: 8.33rpx;
        width: 6.25rpx;
        height: 116.67rpx;
    }
    .image_34 {
        filter: drop-shadow(0rpx 2.08rpx 4.17rpx #00000040);
        width: 79.17rpx;
        height: 75rpx;
    }
    .font_34 {
        font-size: 25rpx;
        font-family: PingFang SC;
        line-height: 23.48rpx;
        font-weight: 600;
        color: #000000;
    }
    .text_32 {
        line-height: 18.54rpx;
    }
</style>
