<!-- 在学和学完集成到同一页面-->
<template>
    <view class="flex-col page" @pageScroll="onPageScroll">
        <view class="flex-col flex-1 group">
            <view class="flex-col">
                <view class="flex-col group_2">
                    <image class="image"/>
                    <view class="flex-col justify-start items-center relative image-wrapper">
                        <image
                            class="image_2"
                            src="../../static/ui_icon/drop_down.png"
                        />
                    </view>
                    <view class="flex-row items-center search-box">
                        <uni-easyinput 
							v-model="searchMsg" 
							placeholder="搜索学习项目~"
							prefix-icon="search"/>
                    </view>
                </view>
                <view class="flex-row group_3 view">
                    <!--<text class="font text_2">默认</text>-->
                    <text
                        :class="{
                            'font text_3 ml-7 selected': showingInProgress,
                            'font text_2 ml-7 unselected': !showingInProgress,
                        }"
                        @click="showInProgress"
                    >在学</text>
                    <text
                        :class="{
                            'font text_3 ml-7 selected': !showingInProgress,
                            'font text_2 ml-7 unselected': showingInProgress,
                        }"
                        @click="showCompleted"
                    >学完</text>
                </view>
                <view class="flex-col group_4">
                    <view class="grid">
                        <view
                            v-for="(image, index) in currentImages"
                            :key="index"
                            class="flex-col items-center grid-item"
                        >
                            <image class="image_4" :src="image.src" />
                            <text class="font_2 mt-11">{{ image.text }}</text>
                        </view>
                        <view class="flex-col items-center grid-item" @click="addNewImage">
                            <image class="image_4" src="/static/ui_icon/addproject.png" />
                            <text class="font_2 mt-11">未命名</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="group_5 mt-191"></view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
			// 搜索框的文字内容
			searchMsg:"",
			
            inProgressRecords: [
                { src: "/static/ui_icon/newcover.jpg", text: "大学物理" },
                { src: "/static/ui_icon/newcover.jpg", text: "数字电路" },
                { src: "/static/ui_icon/newcover.jpg", text: "微机原理" },
                { src: "/static/ui_icon/newcover.jpg", text: "高频电路" },
                { src: "/static/ui_icon/newcover.jpg", text: "毛概" },
            ],
            completedRecords: [
                { src: "/static/ui_icon/newcover.jpg", text: "完成项目1" },
                { src: "/static/ui_icon/newcover.jpg", text: "完成项目2" },
                { src: "/static/ui_icon/newcover.jpg", text: "完成项目3" },
                { src: "/static/ui_icon/newcover.jpg", text: "完成项目4" },
                { src: "/static/ui_icon/newcover.jpg", text: "完成项目5" },
            ],
            currentImages: [],
            showingInProgress: true,
        };
    },

    mounted() {
        this.currentImages = this.inProgressRecords;
    },
	
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function () {
			uni.navigateTo({
				url:"/pages/user/chat"
			})
		}, 1000);
	},
    methods: {
        onPageScroll(e) {
            // 判断是否是下拉动作
            if (e.scrollTop > 0 && this.isPullingDown === false) {
                this.isPullingDown = true;
            }
            // 判断是否达到跳转阈值
            if (e.scrollTop > this.$refs.containerInfo.offsetHeight) {
				console.log("正在下拉")
                uni.redirectTo({
                    url: '/pages/target/target', // 目标页面路径
                    success: function () {
                        console.log('跳转成功');
                    }
                });
            }
        },

        showInProgress() {
            this.currentImages = this.inProgressRecords;
            this.showingInProgress = true;
        },

        showCompleted() {
            this.currentImages = this.completedRecords;
            this.showingInProgress = false;
        },

        addNewImage() {
            uni.showModal({
                title: "添加新项目",
                placeholderText: "请输入项目名称",
                editable: true,
                success: (res) => {
                    if (res.confirm && res.content) {
                        const newImage = {
                            src: "/static/ui_icon/newcover.jpg",
                            text: res.content,
                        };
                        this.inProgressRecords.unshift(newImage)
                    }
                },
            });
        },
    },
};
</script>

<style scoped lang="css">
.search-box {
    margin: 20.78rpx 41.55rpx 0;
    padding: 12.47rpx 24.93rpx;
}
.ml-7 {
    margin-left: 14.54rpx;
}
.ml-11 {
    margin-left: 22.85rpx;
}
.mt-11 {
    margin-top: 22.85rpx;
}
.mt-191 {
    margin-top: 396.81rpx;
}
.page {
    background-color: #f4f2fc;
    border-radius: 58.17rpx;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
.group {
    overflow-y: auto;
	padding: 40rpx 40rpx;
}
.group_2 {
    height: 201.52rpx;
}
.image {
    width: 99.8447vw;
    height: 12.2032vw;
}
.image-wrapper {
    margin: -29.09rpx 24.93rpx 0;
    padding: 12.47rpx 0;
    background-color: #d9d9d900;
}
.image_2 {
    border-radius: 10.39rpx;
    width: 126.73rpx;
    height: 27.01rpx;
}

.image_3 {
    width: 41.55rpx;
    height: 41.55rpx;
}
.text {
    color: #979797;
    font-size: 29.09rpx;
    font-family: PingFang SC;
    line-height: 26.88rpx;
}
.group_3 {
    padding: 25rpx 62.33rpx;
}
.view {
    margin-top: 33.24rpx;
}
.font {
    font-size: 31.16rpx;
    font-family: PingFang SC;
    line-height: 28.98rpx;
    color: #979797;
}
.text_2 {
    color: #979797;
    line-height: 28.65rpx;
}
.text_3 {
    color: #7451ff;
    line-height: 29.04rpx;
}
.group_4 {
    margin-top: 20.78rpx;
	padding: 20rpx, 20rpx;
}
.font_2 {
    font-size: 24.93rpx;
    font-family: PingFang SC;
    line-height: 22.94rpx;
    color: #000000;
}
.text_4 {
    color: #7451ff;
    font-size: 27.01rpx;
    line-height: 24.87rpx;
}
.font_3 {
    font-size: 24.93rpx;
    font-family: PingFang SC;
    color: #979797;
}
.text_5 {
    font-size: 27.01rpx;
    line-height: 25.06rpx;
}
.text_6 {
    font-size: 27.01rpx;
    line-height: 25.1rpx;
}
.grid {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
}
.grid-item {
    width: 30%; /* 调整每个项目的宽度以适应三列布局 */
	height: 280rpx;
    margin-bottom: 16px; /* 调整每个项目的下间距 */
    text-align: center; /* 使文本在网格项中居中对齐 */
	padding: 20rpx 20rpx 20rpx 20rpx;
}
.image_4 {
    width: 100%;
    height: 100%; 
}
.font_2 {
    font-size: 16px;
}
.mt-11 {
    margin-top: 11px;
}
.group_5 {
    margin-bottom: -172.44rpx;
    opacity: 0.95;
    height: 172.44rpx;
}

.group_6 {
    padding: 16.62rpx 0 8.31rpx;
    flex: 1 1 187.48rpx;
    border-radius: 58.17rpx;
    overflow: hidden;
    height: 101.8rpx;
}
.image_5 {
    width: 53.85rpx;
    height: 53.85rpx;
}
.section_2 {
    flex: 1 1 187.48rpx;
    padding: 16.62rpx 0 8.31rpx;
    background-color: #ffffff;
    border-radius: 58.17rpx;
    overflow: hidden;
    height: 101.8rpx;
}
.section_3 {
    padding: 8.31rpx 0;
    flex: 1 1 187.48rpx;
    background-color: #ffffff;
    border-radius: 58.17rpx;
    overflow: hidden;
    height: 101.8rpx;
}
.font_4 {
    font-size: 20.78rpx;
    font-family: PingFang SC;
    line-height: 19.24rpx;
    color: #a6a9b2;
}
.text_10 {
    line-height: 19.07rpx;
}
.text_9 {
    line-height: 19.38rpx;
}
.text_8 {
    color: #7451ff;
    line-height: 19.26rpx;
}
</style>
