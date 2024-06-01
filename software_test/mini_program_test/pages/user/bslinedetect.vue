<template>
    <view class="flex-col page">
        <view class="flex-col">
            <view class="flex-row justify-between items-center section">
                <text class="text">12:30</text>
                <image
                    class="image"
                    src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=cde61db4b88cce707c0a0cdc4c4eb952.png"
                />
            </view>
            <view class="flex-row justify-between items-center section_2">
                <image
                    class="image_2"
                    src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=9b78ae5708b188309a05cbdc8fbc4daa.png"
                />
                <view class="flex-row items-center section_3">
                    <view class="flex-row justify-start items-center image-wrapper">
                        <image
                            class="image_4"
                            src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=07861491b7438d6582d49e350633044a.png"
                        />
                    </view>
                    <view class="section_4 ml-11"></view>
                    <view class="flex-row justify-start items-center image-wrapper ml-11">
                        <image
                            class="image_3"
                            src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=3ce34d5e3bdec744bfd23a7768dbbb16.png"
                        />
                    </view>
                </view>
            </view>
        </view>
        <view class="flex-col group mt-27">
            <view class="flex-row justify-center items-center self-stretch relative group_2">
                <image
                    class="image_5 pos"
                    src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=b5edc2f97ef94958494bb7aa5b3f5719.png"
                />
                <view class="group_3">
                    <text class="font text_2">
                        BASELINE-MONITOR
                        <br />
                    </text>
                    <text class="font_2">{{currentDate1}}</text>
                </view>
                <view class="section_5 pos_2"></view>
            </view>
            <view class="flex-col self-stretch group_4">
                <view class="flex-col items-start section_6">
                    <text class="font text_3">检测说明</text>
                    <view class="group_5 mt-15">
                        <text class="font_3">
                            为了更好的监测学习压力
                            <br />
                        </text>
                        <text class="font_3">需要您在每日</text>
                        <text class="font_2">最平静</text>
                        <text class="font_3">
                            时进行一次压力监测
                            <br />
                        </text>
                        <text class="font_3">
                            放空心情
                            <br />
                        </text>
                        <text class="font_3">请放好摄像头，</text>
                        <text class="font_2">
                            使上半身入画
                            <br />
                        </text>
                        <text class="font_3">
                            跟随指引
                            <br />
                        </text>
                        <text class="font_3">这</text>
                        <text class="font_2">1分钟</text>
                        <text class="font_3">，彻底松弛吧~</text>
                    </view>
                </view>
                <view class="mt-16 flex-col section_7">
                    <text class="self-start font text_4">图例</text>
                    <view class="mt-12 flex-row self-stretch">
                        <view class="section_8">
                            <image
                                class="image_6"
                                src="/static/logo.png"
                            />
                        </view>
                        <view class="section_9">
                            <image
                                class="image_7"
                                src="https://ide.code.fun/api/image?token=66478e3ba2432f00114f852d&name=example2.png"
                            />
                        </view>
                    </view>
                </view>
            </view>
            <view class="flex-col justify-start items-center button text-wrapper" @click="goTobttest"><text class="text_5">开始</text></view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
			currentDate1:''
		};
    },
	created() {
	        const today = new Date();
	        const yyyy = today.getFullYear();
	        const mm = String(today.getMonth() + 1).padStart(2, '0');
	        const dd = String(today.getDate()).padStart(2, '0');
	        this.currentDate1 = `${yyyy}/${mm}/${dd}`;
	},

    methods: {
		goTobttest(){
			uni.navigateTo({
			      url: '/pages/user/bswait4bt' // 目标页面的路径
			  });
		}
	},
};
</script>

<style scoped lang="css">
.ml-11 {
    margin-left: 22.92rpx;
}
.mt-27 {
    margin-top: 56.25rpx;
}
.mt-15 {
    margin-top: 31.25rpx;
}
.page {
    padding-bottom: 283.33rpx;
    background-image: linear-gradient(180deg, #ffeacc 0%, #f4f2fc 64.5%);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
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
.group {
    padding: 0 41.67rpx;
}
.group_2 {
    margin-right: 8.33rpx;
}
.image_5 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.pos {
    position: absolute;
    left: 0;
    top: 3.52rpx;
}
.group_3 {
    line-height: 25rpx;
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
.font_2 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 25rpx;
    color: #000000;
}
.section_5 {
    background-color: #00000000;
    width: 50rpx;
    height: 50rpx;
}
.pos_2 {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.group_4 {
    margin-top: 54.17rpx;
}
.section_6 {
    padding: 33.33rpx 37.5rpx;
    background-color: #ffffff;
    border-radius: 25rpx;
}
.text_3 {
    line-height: 27.42rpx;
}
.group_5 {
    line-height: 25rpx;
    width: 413.5rpx;
}
.font_3 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 25rpx;
    color: #979797;
}
.section_7 {
    padding: 33.33rpx 0;
    background-color: #ffffff;
    border-radius: 25rpx;
}
.text_4 {
    margin-left: 41.67rpx;
    line-height: 27.21rpx;
}
.section_8 {
    flex: 1 1 333.33rpx;
    background-color: #f2f2f2e6;
    height: 287.5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.section_9 {
    flex: 1 1 333.33rpx;
    background-color: #d9d9d9;
    height: 287.5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image_6 {
    width: 300rpx;
    height: 200rpx;
}
.image_7 {
    width: 300rpx;
    height: 200rpx;
}
.button {
    align-self: center;
    margin-top: 150rpx;
}
.text-wrapper {
    padding: 37.5rpx 0;
    background-image: linear-gradient(180deg, #453099b3 0%, #7451ff 100%);
    border-radius: 104.17rpx;
    width: 264.58rpx;
}
.text_5 {
    color: #ffffff;
    font-size: 41.67rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 39.17rpx;
}
</style>
