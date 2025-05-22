// 用于检测是否字段是否在数据库中唯一
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {key, value} = event
	let key_value = {}
	key_value[key] = value	// 直接写key:value
	
	return await db.collection("SmartLearn_user").where(key_value).get()
};
