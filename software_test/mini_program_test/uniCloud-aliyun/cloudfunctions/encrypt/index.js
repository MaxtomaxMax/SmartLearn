// 用户密码加密算法
'use strict';
const bcrypt = require("bcryptjs")

exports.main = async (event, context) => {
	let {password} = event;
	
	// 检查密码是否被提供
	if (!password){
		return {
			code:-1,
			msg: '用户密码不能为空'
		};
	}
	
	// 生成盐并哈希密码
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds)
	
	return hash
};
