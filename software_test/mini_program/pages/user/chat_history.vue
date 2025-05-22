<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
        <view class="flex-col flex-1 group">
            <view class="flex-row items-center group_2">
                <view class="flex-col justify-start items-center image-wrapper_2">
                    <image
                        class="image_5"
                        src="../../static/ui_icon/exit.png"
						@click="exit"
                    />
                </view>
                <view class="flex-col justify-start text-wrapper" @click="enterChat"><text class="font text_2" >自由问答</text></view>
                <view class="flex-col justify-start text-wrapper" @click="enterKnowledgeMap"><text class="font text_2">知识框架</text></view>
                <view class="flex-col justify-start text-wrapper" ><text class="font text">历史</text></view>
            </view>
            <view class="flex-col" style="margin-top: 15rpx;">
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
            </view>
			<view class="flex-col history-container">
			    <!-- 内容 -->
				<scroll-view scroll-y="true" class="chat-history"
				:style="{height: `${windowHeight - inputHeight - 180}rpx`}">
					<view v-for="(item,index) in showList" :key="index" >
						<view class="history-item">
							<!-- <text class="history-text">{{item.content}}</text> -->
							<ua-markdown :source="item.content"></ua-markdown>
						</view>
						<view class="flex-row date-container justify-end">
							<text class="date-text">{{getDateString(item.posttime)}}</text>
						</view>
						<view class="self-stretch divider"></view>
					</view>
					<!-- 底部放空间使所有信息全部渲染 -->
					<view :style="{height:'50rpx'}"></view>
				</scroll-view>
			</view>
        </view>
    </view>
</template>

<script>
const db = uniCloud.database()
export default {
    components: {},
    props: {},
    data() {
        return {
			containerWidth: '0px',
			containerHeight: '0px',
			
            time_value : 0,
			time_range : [
			        { value: 1, text: "今天" },
			        { value: 2, text: "一周内" },
			        { value: 3, text: "一周前" },
			],
			group_value: 0,
			group_range : [],	// 需要获取云数据库的用户分组
			
			keyboardHeight: 0,
			bottomHeight: 0,
			
			userId : '',
			// 登录的用户总的数据列表
			msgList:[],
			msgToday:[],
			// 一周内的数据
			msgInWeek:[],
			// 一周以前的数据
			msgBydWeek:[],
			// 当前展示的数据
			showList:[]
			
        };
    },
	computed: {
		windowHeight() {
			return this.rpxTopx(uni.getSystemInfoSync().windowHeight);
		},
		// 键盘弹起来的高度+发送框高度
		inputHeight() {
			return this.bottomHeight + this.keyboardHeight;
		}
	},
	async onLoad() {
		// 获取页面高度
		this.setContainerSize();
		
		this.userId = uni.getStorageSync("user_id")
		const userChatDataRes = await db.collection("chat_data")
			.where({
				userId: this.userId
			})
			.get()
		// console.log(userChatDataRes)
		// console.log(userChatDataRes.result.data)
		this.msgList = userChatDataRes.result.data
		// console.log(this.msgList)
		
		// 比较日期来划分成不同的子列表
		// 使用 new Date() 所创造的对象可以用于比较
		const today = new Date()
		console.log("当前时间：",today)
		
		// 测试函数 dateDiffInDays
		// let testDate = new Date('2023-4-16')
		// let dateDiff = this.dateDiffInDays(today, today)
		// console.log(dateDiff)
		// return;
		
		for (let i = 0; i < this.msgList.length; i++) {
			let postDate = new Date(this.msgList[i].posttime);
			let dateDiff = this.dateDiffInDays(today, postDate);
			// console.log(this.msgList[i])
			if (dateDiff > 7){
				this.msgBydWeek.push(this.msgList[i]);
				continue;
			}
			if (dateDiff < 7 && dateDiff > 0){
				this.msgInWeek.push(this.msgList[i]);
				continue;
			}
			
			if (dateDiff == 0){
				this.msgToday.push(this.msgList[i])
				continue;
			}
		}
		// console.log(this.msgToday)
	},

    methods: {
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
		enterKnowledgeMap(){
			uni.navigateTo({
				url:"/pages/user/knowledgeMap"
			})
		},
		exit(){
			uni.switchTab({
				url:"/pages/review/learning"
			})
		},
		getDateString(posttime){
			// 由Date对象获取对应的日期的字符串
			const date = new Date(posttime);
			
			const year = date.getFullYear();
			const month = date.getMonth();
			const day = date.getDate();
			return `${year}-${month+1}-${day}`;
		},
		dateDiffInDays(date1, date2){
			// 提取年、月、日
			const year1 = date1.getFullYear();
			const month1 = date1.getMonth();
			const day1 = date1.getDate();
			
			const year2 = date2.getFullYear();
			const month2 = date2.getMonth();
			const day2 = date2.getDate();
			
			// 创建新的日期对象，只使用年、月、日
			const startDate = new Date(year1, month1, day1);
			const endDate = new Date(year2, month2, day2);
			
			// 计算日期差异，使用 Date.UTC 来确保时区差异不影响结果
			const diffTime = Math.abs(Date.UTC(year2, month2, day2) - Date.UTC(year1, month1, day1));
			const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
			
			return diffDays;
		},
		enterChat(){
			uni.redirectTo({
				url:"/pages/user/chat"
			})
		},
		time_change(time_value) {
			console.log("time_value:", time_value);
			if (time_value == 1){
				this.showList = this.msgToday
				return;
			}
			if (time_value == 2){
				this.showList = this.msgInWeek
				return;
			}
			if (time_value == 3){
				this.showList = this.msgBydWeek
				return;
			}
			
		},
		
		// 稍后再开发
		group_change(e) {
			console.log("e:", e);
		},

		// rpx 转换成 px
		rpxTopx(px) {
			let deviceWidth = uni.getSystemInfoSync().windowWidth;
			let rpx = (750 / deviceWidth) * Number(px);
			return Math.floor(rpx);
		},
	},
};
</script>

<style scoped lang="css">
.date-text{
	font-size: 18rpx;
	text-align: right;
}
.date-container{
	height: 20rpx;
	padding-right: 20rpx;
}
.history-text{
	font-size: 25rpx;
}
.history-item{
	margin: 20rpx 0 10rpx 0;
	padding-right: 20rpx;
}
	
/* 需要修改uni-ui的深层样式 */
.select-container >>> .uni-select {
	padding: 0 20px;
	padding-left: 10px;
}
.history-container{
	height: 70vh;
	/* width: 90%; */
	padding-left: 40rpx;
	padding-right: 20rpx;
	
}
.chat-history{
	height: 100%;
}
.select-label{
	width: 90rpx;
}
.select-container{
	width: 240rpx;
	background-color: #FFFFFF
}
.divider {
    margin-top: 14.13rpx;
    background-color: #d7d7d7;
    height: 2.08rpx;
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
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100%;
}
.group {
    padding: 60rpx 0 25rpx;
}
.group_2 {
    padding: 0 30rpx;
}
.image-wrapper_2 {
    width: 68.75rpx;
}
.image_5 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.text-wrapper {
    margin-left: 60rpx;
}
.font {
    font-size: 33.33rpx;
    font-family: PingFang SC;
    line-height: 31.13rpx;
}
.text {
    color: #7451ff;
    line-height: 31.29rpx;
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
    font-size: 28rpx;
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
