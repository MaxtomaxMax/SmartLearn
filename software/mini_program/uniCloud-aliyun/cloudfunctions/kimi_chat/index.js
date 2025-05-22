const axios = require("axios");

exports.main = async (event, context) => {
	const MOONSHOT_API_KEY = "sk-qY1qxP1qz4nQsu4TyoTQyA9VjoiqpjrbrBABNnK3NZF3bg3v";
	const BASE_URL = "https://api.moonshot.cn/v1";
	
	// ||表示选择第一个真值
	let history = event.history || [{
		role:"system",
		content: "你是SmartLearn智学学习助手，\
		由SmartLearn智学团推开发的人工智能学习助手，\
		你能使用中英文进行对话。你会为用户提供安全，\
		有帮助，准确的与学习相关的回答。\
		同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。\
		SmartLearn的翻译为：智学，不可翻译成其它单词。"
	}];
	
	const prompt = event.prompt;
	
	history = history.concat([{
		role:"user",
		content: prompt
	}]);
	
	try{
		const response = await axios.post(`${BASE_URL}/chat/completions`,{
			model: "moonshot-v1-8k",
			messages: history
		},{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${MOONSHOT_API_KEY}`
			}
		});
		
		if (response.status === 200 && response.data.choices && response.data.choices.length > 0) {
		            const completion = response.data.choices[0].message;
		            history = history.concat(completion);
		            return await {
		                success: true,
		                message: completion.content,
		                history: history
		            };
			} else {
				return await {
					success: false,
					error: "Invalid response from API"
				};
			}
	}catch(error){
		//TODO handle the exception
		return await {
			success:false,
			error: error.message
		}
	}
	
};
