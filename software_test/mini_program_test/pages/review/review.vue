<template>
    <view class="flex-col items-stretch justify-start page" :style="{ width: containerWidth, height: containerHeight}">
        
        <view class="flex-row justify-center items-center relative section_5">
            <view class="flex-col justify-start items-center image-wrapper_2 pos">
                <image
                    class="image_5"
                    src="https://ide.code.fun/api/image?token=664a30397a1eb60011e78cd9&name=2e5f9f83fccc486ba3b7781bd271c017.png"
                />
            </view>
            <view class="flex-col justify-start"><text class="font text_2">复习</text></view>
            <view class="section_6 pos_2"></view>
        </view>

		<view class="flex-col section_7">
			<text class="self-start font text_3">生成时间：2024.5.15</text>
			<text class="mt-10 self-start font text_4">掌握程度：1/3</text>
		</view>
		
		<view class="section_10"></view>
		
		<view class="flex-col section_11">
			<view class="flex-col justify-start self-stretch">
				<view class="flex-col justify-start items-start text-wrapper"><text class="font text_9">复习内容</text></view>
			</view>
		</view>
    </view>
	<view class="flex-col justify-start items-center self-stretch section_12 mt-9" :style="{width: containerWidth}">
		<view class="flex-row">
			<view class="flex-col justify-start items-center button"><text class="font_7 text_21">←</text></view>
			<view class="flex-col justify-start items-center button_1 ml-11">
				<text class="font_6 text_20">忘记了</text>
			</view>
			<view class="flex-col justify-start items-center button_2 ml-11">
				<text class="font_6 text_1">已掌握</text>
			</view>
			<view class="flex-col justify-start items-center button_3 ml-11"><text class="font_7 text_22">→</text></view>
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
		};
    },
    
	onLoad(event) {
		this.setContainerSize();
		console.log(event)
	},
    methods: {
		setContainerSize() {
			try {
				const res = uni.getSystemInfoSync();
				console.log(res);
				const screenWidth = res.screenWidth;
				// 屏幕高度要前去头部
				// #ifdef MP-WEIXIN
				const screenHeight = res.windowHeight;
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
	},
};
</script>

<style scoped lang="css">
    .ml-11 {
        margin-left: 22.92rpx;
    }
    .mt-5 {
        margin-top: 10.42rpx;
    }
    .mt-9 {
        margin-top: 18.75rpx;
    }
    .page {
		padding-left: 40rpx;
		padding-right: 40rpx;
        background-image: linear-gradient(180deg, #ffeacc 0%, #f4f2fc 64.5%);
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .section {
        padding: 13.81rpx 32.81rpx 13.27rpx 34.85rpx;
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
        padding: 22.92rpx 12.5rpx 22.92rpx 35.42rpx;
        background-color: #ffffff;
    }
    .image_2 {
        width: 18.75rpx;
        height: 35.42rpx;
    }
    .section_3 {
        padding: 10.5rpx 25.88rpx 12.42rpx 26.13rpx;
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
        padding: 60rpx 15rpx 60rpx;
        background-color: #fbeddb;
    }
    .image-wrapper_2 {
        width: 56.25rpx;
    }
    .pos {
        position: absolute;
        left: 33.67rpx;
        top: 50%;
        transform: translateY(-50%);
    }
    .image_5 {
        width: 41.67rpx;
        height: 41.67rpx;
    }
    .section_6 {
        background-color: #00000000;
        width: 50rpx;
        height: 50rpx;
    }
    .pos_2 {
        position: absolute;
        right: 50rpx;
        top: 50%;
        transform: translateY(-50%);
    }
    .section_7 {
        padding-top: 32rpx;
        padding-bottom: 32rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .font {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        line-height: 27.29rpx;
        color: #000000;
    }
    .text_3 {
        margin-left: 38.58rpx;
        line-height: 27.25rpx;
    }
    .text_2 {
        line-height: 27.04rpx;
    }
    .text_4 {
        margin-left: 39.42rpx;
    }
    .text_5 {
        margin-left: 38.96rpx;
        line-height: 27.33rpx;
    }
    .group_2 {
        padding: 34.65rpx 0 56.23rpx;
    }
    .divider {
        margin-left: 41.67rpx;
        margin-right: 39.58rpx;
        background-color: #000000;
        height: 2.08rpx;
    }
    .equal-division {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    .group_3 {
        padding: 0 18.42rpx;
    }
    .group_4 {
        flex: 1 1 104.65rpx;
    }
    .group_12 {
        padding: 10rpx 0 13.06rpx;
    }
    .font_2 {
        font-size: 16.67rpx;
        font-family: PingFang SC;
        line-height: 12.38rpx;
        color: #000000;
    }
    .section_8 {
        background-color: #d9d9d9;
        border-radius: 50%;
        width: 6.25rpx;
        height: 6.25rpx;
    }
    .group_1 {
        padding: 10rpx 31.04rpx 13.31rpx 36.1rpx;
    }
    .view {
        margin-left: 9.58rpx;
    }
    .text_7 {
        line-height: 12.13rpx;
    }
    .group_6 {
        padding: 10rpx 31.13rpx 13.06rpx 36.02rpx;
    }
    .view_2 {
        margin-left: 9.21rpx;
    }
    .group_7 {
        padding: 10rpx 31.58rpx 10rpx 35.46rpx;
    }
    .font_3 {
        font-size: 16.67rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #de665d;
    }
    .text_6 {
        line-height: 12.38rpx;
    }
    .section_9 {
        margin-left: 9.29rpx;
        background-color: #de665d;
        border-radius: 50%;
        width: 6.25rpx;
        height: 6.25rpx;
    }
    .text_8 {
        line-height: 15.44rpx;
    }
    .group_8 {
        padding: 10rpx 30.58rpx 10rpx 34.48rpx;
    }
    .view_3 {
        margin-left: 9.79rpx;
    }
    .font_4 {
        font-size: 16.67rpx;
        font-family: PingFang SC;
        line-height: 15.44rpx;
        color: #000000;
    }
    .group_9 {
        padding: 10rpx 0;
    }
    .section_10 {
        margin-left: 6.25rpx;
        background-color: #f8efe7;
        height: 25rpx;
    }
    .section_11 {
		height: 1050rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text-wrapper {
        padding: 31.29rpx 0 22.67rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
    }
    .text_9 {
        margin-left: 36.48rpx;
    }
    .font_5 {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        line-height: 35.42rpx;
        color: #000000;
    }
    .button {
        padding: 26.31rpx 0 25.21rpx;
        background-image: linear-gradient(180deg, #453099b3 0%, #7451ff66 68%);
        border-radius: 104.17rpx;
        width: 96.27rpx;
        height: 64.65rpx;
    }
    .font_7 {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        line-height: 12.38rpx;
        font-weight: 600;
        color: #ffffff;
    }
    .text_21 {
        line-height: 13.13rpx;
    }
    .button_1 {
        padding: 19.1rpx 0 18.44rpx;
        background-image: linear-gradient(180deg, #ffb238 0%, #ff9328 100%);
        border-radius: 104.17rpx;
        width: 156.25rpx;
        height: 64.65rpx;
    }
    .font_6 {
        font-size: 29.17rpx;
        font-family: PingFang SC;
        line-height: 27.29rpx;
        font-weight: 600;
        color: #ffffff;
    }
    .text_20 {
        line-height: 27.1rpx;
    }
    .button_2 {
        padding: 19.38rpx 0 18.17rpx;
        background-image: linear-gradient(180deg, #ffb238 0%, #ff9328 100%);
        border-radius: 104.17rpx;
        width: 156.25rpx;
        height: 64.65rpx;
    }
    .text_1 {
        line-height: 27.1rpx;
    }
    .button_3 {
        padding: 26.31rpx 0 25.21rpx;
        background-image: linear-gradient(180deg, #453099b3 0%, #7451ff66 100%);
        border-radius: 104.17rpx;
        width: 95rpx;
        height: 64.65rpx;
    }
    .text_22 {
        line-height: 13.13rpx;
    }
    .section_12 {
        position: absolute;
        bottom: 0; 
		
        padding: 39.52rpx 30rpx 39.52rpx 30rpx;
        background-color: #ffffff;
        border-radius: 25rpx;
        box-shadow: 0rpx -4.17rpx 8.33rpx #00000040;	
    }
</style>
