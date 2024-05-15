<template>
    <view class="flex-col page">
        <view class="flex-col flex-1 group_2 ">
            <view class="flex-col justify-start relative header">
                <view class="flex-row items-center group">
                    <view class="flex-col justify-start items-center image-wrapper">
                        <image
                            class="image_2"
                            src="../../static/ui_icon/exit.png"
                        />	
                    </view>
                    <view class="flex-col justify-start text-wrapper"><text class="font text">答疑</text></view>
                    <view class="flex-col justify-start text-wrapper_2"><text class="font text_2">历史</text></view>
                </view>
            </view>
            <view class="flex-col group_3">
               <!-- <view class="mt-12 flex-col input section_3">
                    <text class="self-start font text_8">向我提问吧~</text>	
                </view> -->
				<textarea class="textarea-field" @input="autoResize"></textarea>
            </view>
			

            <view class="shrink-0 group_4"></view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },

    methods: {
		autoResize(event) {
		      const textarea = this.$refs.textarea;
		      const pixelValue = textarea.scrollHeight;
		      const rpxValue = pixelValue * (750 / wx.getSystemInfoSync().windowWidth);
		      textarea.style.height = 'auto'; // 重置高度
		      textarea.style.height = rpxValue + 'rpx'; // 根据内容调整高度
		    }
	},
};
</script>

<style scoped lang="css">
.mt-7 {
    margin-top: 14.58rpx;
}
.page {
    background-color: #f4f2fc;
    border-radius: 58.33rpx;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
.group_2 {
    overflow-y: auto;
}
.header {
    margin-top: -91.67rpx;
    padding: 91.67rpx 0 22.92rpx;
    background-color: #f4f2fc;
}
.group {
    padding: 0 27.67rpx;
}
/* .group_3 {
    padding: 0 41.67rpx 18.5rpx 41.67rpx;
} */
.group_3 {
    padding: 995.83rpx 125rpx 172.92rpx;
}


.image-wrapper {
    width: 68.75rpx;
}
.image_2 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.text-wrapper {
    margin-left: 140.44rpx;
}
.font {
    font-size: 33.33rpx;
    font-family: PingFang SC;
    line-height: 30.88rpx;
    color: #979797;
}
.text {
    color: #7451ff;
    line-height: 31.29rpx;
}
.text-wrapper_2 {
    margin-left: 158.17rpx;
}
.text_2 {
    line-height: 30.54rpx;
}

.text-wrapper_3 {
    padding: 24rpx 0 21.08rpx;
    background-color: #7451ff99;
    border-radius: 0 0 0rpx 33.33rpx;
}
.font_2 {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 26.92rpx;
    font-weight: 300;
    color: #000000;
}
.text_3 {
    margin-left: 20.48rpx;
    margin-right: 19.1rpx;
}
.section {
    padding: 0 14.58rpx 28.17rpx;
    background-color: #eaeaea;
    border-radius: 33.33rpx 33.33rpx 33.33rpx 0rpx;
}
.text-wrapper_4 {
    margin-right: 11.48rpx;
    padding-top: 17.25rpx;
    height: 368.75rpx;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.font_3 {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 50rpx;
    font-weight: 300;
    color: #000000;
}
.font_4 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.9rpx;
    font-weight: 100;
    color: #979797;
}
.text_4 {
    transform: rotate(0.7deg);
}
.text_1 {
    margin-left: 7.6rpx;
}
.text-wrapper_5 {
    padding: 23.5rpx 0 22.08rpx;
    background-color: #7451ff99;
    border-radius: 33.33rpx 33.33rpx 0rpx 33.33rpx;
}
.text_5 {
    margin-left: 20.17rpx;
    margin-right: 19.42rpx;
    line-height: 27.33rpx;
}
.section_2 {
    padding: 0 15.6rpx 13.58rpx;
    background-color: #eaeaea;
    border-radius: 33.33rpx 33.33rpx 33.33rpx 0rpx;
}
.text-wrapper_6 {
    margin-right: 5.23rpx;
    padding-top: 14.79rpx;
    height: 466.29rpx;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.text_6 {
    margin-right: 5.23rpx;
}
.text_15 {
    margin-left: 6.58rpx;
}
.input {
    position: relative;
    align-self: stretch;
}
.section_3 {
    padding: 19.13rpx 52.02rpx 19.54rpx 54.17rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
}
.text_7 {
    margin-left: 59.46rpx;
    color: #979797;
    font-size: 25rpx;
    font-family: PingFang SC;
    line-height: 23rpx;
}
.divider {
    margin-top: 14.13rpx;
    background-color: #d7d7d7;
    height: 2.08rpx;
}
.text_8 {
    margin-left: 61.94rpx;
    margin-top: 16.25rpx;
}

.pos {
    position: absolute;
    left: 62.5rpx;
    top: 8.33rpx;
}
.group_4 {
    margin-bottom: -172.92rpx;
    opacity: 0.95;
    height: 172.92rpx;
}
.tab-bar {
    padding: 35.42rpx 0 35.42rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
    backdrop-filter: blur(0rpx);
}
.group_5 {
    padding: 16.75rpx 0 10.29rpx;
    flex: 1 1 188rpx;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.image_3 {
    width: 54rpx;
    height: 54rpx;
}
.section_4 {
    padding: 14.67rpx 0 10.33rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.section_7 {
    padding: 16.75rpx 0 10.44rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.section_5 {
    padding: 6.33rpx 0 10.38rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.font_5 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.9rpx;
    color: #a6a9b2;
}
.text_11 {
    line-height: 19.13rpx;
}
.text_10 {
    line-height: 19.44rpx;
}
.text_9 {
    color: #7451ff;
    line-height: 19.31rpx;
}
.text_12 {
    line-height: 19.29rpx;
}
.textarea-field {
  width: 90%;
  height: 50rpx;
  padding: 10rpx;
  border-radius: 20rpx;
  border: 1rpx solid #dcdcdc;
  resize: none;
  background-color: #FFFFFF;
}

</style>
