'use strict';
// 获取数据库实例
	const db = uniCloud.database();

exports.main = async (event, context) => {		
	//event为客户端上传的参数
	console.log('event : ', event)
	try{
		// 获取客户端上传的信息
		let {email, password} = event;
		// 参数校验
		if (!email || !password){
			throw new Error("邮箱和密码不能为空！");
		}
		// 调用函数进行数据库操作
		let user = await createUser(email, password)
		
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
};

async function createUser(email, password){
	const user_info = {
		email: email,
		password: password
	}
		
	// 用户信息写入数据库
	// const result = await db.collection('user_info').add(user_info); 这样写是添加一个user_info的实例
	const result = await db.collection('SmartLearn_user').add(user_info);
	
	return {
		user_info: user_info,
		result: result
	};
}