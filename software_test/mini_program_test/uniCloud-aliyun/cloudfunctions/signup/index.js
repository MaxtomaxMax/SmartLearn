'use strict';
// 获取数据库实例
	const db = uniCloud.database();

exports.main = async (event, context) => {		
	//event为客户端上传的参数
	console.log('event : ', event)
	try{
		// 获取客户端上传的信息
		const {email, password} = event;
		// 参数校验
		if (!email || !password){
			throw new Error("邮箱和密码不能为空！");
		}
		
		// 调用函数进行数据库操作
		const user = await createUser(email, password)
		
		// 注册成功，返回用户信息
		return {
			code:0, // 表示成功
			data: user
		};
	}catch(err){
		//TODO handle the exception
		return {
			code:-1, // 表示失败
			message: err.message
		};
	}
	
	//返回数据给客户端
	return event
};

async function createUser(email, password){
	const user_info = {
		email: email,
		password: password
	}
		
	// 用户信息写入数据库
	const result = await db.collection('user_info').add(user_info);
	
	return {
		user_info: user_info,
		result: result
	};
}