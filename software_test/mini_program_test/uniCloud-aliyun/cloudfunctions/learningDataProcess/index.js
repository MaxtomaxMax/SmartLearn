// 学习数据计算
'use strict';
exports.main = async (event, context) => {
	const {elapsedTime, SDNNlist, RMSSDlist, tiredTime, NoattTime, RMSSD_bs, SDNN_bs} = event;
	
	// 计算专注度
	const attentionLevel = (elapsedTime - NoattTime - tiredTime)/elapsedTime;
		
	// 计算压力值
	let RMSSD_sum = 0;
	let RMSSD_count = 0;
	for (let i = 0; i < RMSSDlist.length; i++){
		if (RMSSDlist[i]["RMSSD"] != 0){
			// 0为异常值，不做计算
			RMSSD_sum += RMSSDlist[i]["RMSSD"];
			RMSSD_count += 1;
		}
	}
	let RMSSD_mean = RMSSD_sum / RMSSD_count;
	
	let SDNN_sum = 0;
	let SDNN_count = 0;
	for (let i = 0; i < SDNNlist.length; i++){
		if (SDNNlist[i]["SDNN"] != 0){
			// 0为异常值，不做计算
			SDNN_sum += SDNNlist[i]["SDNN"];
			SDNN_count += 1;
		}
		
	}
	let SDNN_mean = SDNN_sum / SDNN_count;
	
	let temp1 = (RMSSD_mean - RMSSD_bs)/RMSSD_bs;
	let temp2 = (SDNN_mean - SDNN_bs)/SDNN_bs;
	
	const pressureValue = 0.5 - 0.5*(temp1 + temp2);
	
	return await {
		attentionLevel,
		pressureValue
	}
};
