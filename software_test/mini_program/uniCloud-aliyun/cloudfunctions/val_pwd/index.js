// 验证密码
'use strict';
const bcrypt = require("bcryptjs");

exports.main = async (event, context) => {
	let {password, pwd_stored} = event;
	
	try{
		let result = await bcrypt.compare(password, pwd_stored);
		if (result){
			return {
				code:0,
				message: 'Login successful'
			}
		} else {
			return {
				code:-1,
				message: 'Invalid password'
			}
		}
	} catch(err){
		return {
			code:-2,
			message:'Error comparing passwords'
		}
	}
	
}
	