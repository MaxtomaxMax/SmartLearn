// 学习数据计算
'use strict';
exports.main = async (event, context) => {
	const {elapsedTime, SDNNlist, RMSSDlist, tiredTime, NoattTime, RMSSD_bs, SDNN_bs} = event;
	
	// 计算专注度
	const attentionLevel = (elapsedTime - NoattTime - tiredTime)/elapsedTime;
		
	// 计算压力值
	let RMSSD_sum = 0
	for (let i = 0; i < RMSSDlist.length; i++){
		RMSSD_sum += RMSSDlist[i];
	}
	let RMSSD_mean = RMSSD_sum / SDNNlist.length;
	
	let SDNN_sum = 0
	for (let i = 0; i < SDNNlist.length; i++){
		SDNN_sum += SDNNlist[i];
	}
	let SDNN_mean = SDNN_sum / SDNNlist.length;
	
	let temp1 = (RMSSD_mean - RMSSD_bs)/RMSSD_bs;
	let temp2 = (SDNN_mean - SDNN_bs)/SDNN_bs;
	
	const pressureValue = 0.5 - 0.5*(temp1 + temp2);
	
	return await {
		attentionLevel,
		pressureValue
	}
};
