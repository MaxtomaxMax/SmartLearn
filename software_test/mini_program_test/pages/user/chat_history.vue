<template>
    <view class="flex-col page">
        <view class="flex-col flex-1 group">
            <view class="flex-row items-center group_2">
                <view class="flex-row justify-start items-center image-wrapper_2">
                    <image
                        class="image_5"
                        src="../../static/ui_icon/exit.png"
                    />
                </view>
                <view class="flex-row justify-start text-wrapper" @click="enterChat"><text class="font text_2">答疑</text></view>
                <view class="flex-row justify-start text-wrapper_2"><text class="font text_3">历史</text></view>
            </view>
            <view class="mt-18 flex-col">
                <view class="flex-row equal-division">
                    <view class="flex-row items-center group_3 equal-division-item">
						<view class="items-center select-label">
							<text class="font_2">时间：</text>
						</view>
						<view class="select-container">
							<uni-data-select
							      v-model="time_value"
							      :localdata="time_range"
							      @change="time_change"
							    ></uni-data-select>
						</view>
						
                    </view>
                    <view class="flex-row  items-center group_3 equal-division-item">
						<view class="items-center select-label">
							<text class="font_2">分组：</text>
						</view>
						<view class="select-container">
							<uni-data-select
							      v-model="group_value"
							      :localdata="group_range"
							      @change="group_change"
							    ></uni-data-select>
						</view>
                        
                    </view>
                    
                </view>
                <view class="flex-col group_4">
                    <!-- 内容 -->
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
            time_value : 0,
			time_range : [
			        { value: 1, text: "今天" },
			        { value: 2, text: "一周内" },
			        { value: 3, text: "一周前" },
			],
			group_value: 0,
			group_range : [],	// 需要获取云数据库的用户分组
        };
    },

    methods: {
		enterChat(){
			uni.redirectTo({
				url:"/pages/user/chat"
			})
		},
		time_change(e) {
		      console.log("e:", e);
		},
		group_change(e) {
		      console.log("e:", e);
		},
		time_change(e) {
		      console.log("e:", e);
		},
	},
};
</script>

<style scoped lang="css">
.select-label{
	width: 90rpx;
}
.select-container{
	width: 180rpx;
}
.ml-5 {
    margin-left: 10.42rpx;
}
.ml-3 {
    margin-left: 6.25rpx;
}
.mt-21 {
    margin-top: 43.75rpx;
}
.ml-19 {
    margin-left: 39.58rpx;
}
.page {
    background-color: #f4f2fc;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
.group {
    padding: 58.33rpx 0 625rpx;
    overflow-y: auto;
}
.group_2 {
    padding: 0 29.17rpx;
}
.image-wrapper_2 {
    width: 68.75rpx;
}
.image_5 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.text-wrapper {
    margin-left: 141.67rpx;
}
.font {
    font-size: 33.33rpx;
    font-family: PingFang SC;
    line-height: 31.13rpx;
}
.text_2 {
    color: #979797;
}
.text-wrapper_2 {
    margin-left: 158.33rpx;
}
.text_3 {
    color: #7451ff;
    line-height: 30.79rpx;
}
.equal-division {
    padding: 4.17rpx 8.33rpx 8.33rpx;
    background-color: #f4f2fc;
    border-top: solid 2.08rpx #d7d7d7;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.group_3 {
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: auto;
}
.equal-division-item {
    padding: 8.33rpx 5rpx;
}
.font_2 {
    font-size: 30	rpx;
    font-family: SF Pro Text;
    line-height: 26.69rpx;
    color: #000000;
}
.image_6 {
    width: 22.92rpx;
    height: 10.42rpx;
}
.group_4 {
    padding: 29.17rpx 41.67rpx 0;
}
.text_4 {
    line-height: 25.81rpx;
}
.list {
    margin-top: 4.17rpx;
}
.list-item {
    padding: 29.17rpx 0;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.text_5 {
    line-height: 27.04rpx;
}
.image_7 {
    margin-right: 22.92rpx;
    width: 10.42rpx;
    height: 22.92rpx;
}
.image_8 {
    margin-right: 20.83rpx;
}
.text_7 {
    margin-top: 33.33rpx;
    line-height: 25.81rpx;
}
.group_5 {
    padding-bottom: 33.33rpx;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.text_8 {
    line-height: 35.42rpx;
}
.tab-bar {
    padding: 35.42rpx 0;
    background-color: #ffffff;
    box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
    backdrop-filter: blur(0rpx);
}
.group_6 {
    padding: 16.67rpx 0 8.33rpx;
    flex: 1 1 188rpx;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.image_9 {
    width: 54rpx;
    height: 54rpx;
}
.section_5 {
    flex: 1 1 188rpx;
    padding: 16.67rpx 0 8.33rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.section_6 {
    padding: 8.33rpx 0;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.font_3 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.13rpx;
    color: #a6a9b2;
}
.text_10 {
    line-height: 19.44rpx;
}
.text_9 {
    color: #7451ff;
    line-height: 19.31rpx;
}
.text_11 {
    line-height: 19.29rpx;
}
</style>
