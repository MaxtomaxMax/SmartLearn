const db = uniCloud.database()
module.exports = {
	_before: function () { // 通用预处理器
	},
	
	add:async (data)=>{
		let {email, password} = data
		
		await db.collection("SmartLearn_user").add({
			email,
			password
		})
	}

}
