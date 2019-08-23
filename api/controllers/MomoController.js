const Sequelize = require('Sequelize');
var hd1payment_db = new Sequelize('mysql://root:root@localhost:3306/fimplus');
var hd1cas_db = new Sequelize('mysql://root:root@localhost:3306/fimpluspayment');
hd1cas = [];
module.exports = {
	getMomo: function (req, res){
		hd1payment_db.query("SELECT S.userId, C.transId, C.amount, S.id as sourceId, M.name as methodName FROM charge C JOIN source S ON C.sourceId = S.id JOIN method M ON M.id = S.methodId WHERE M.id = '3d2e3fde-6057-4190-abfd-e40b06595fea'").then(([results1, metadata]) => {
				var filtered = [];	
				var query= [];	
				var str = [];
				for(fillter in results1){
				str.push (results1[fillter].userId)
				}
				var strUserId = (JSON.stringify(str))
				strUserId = strUserId.replace('[','')
				strUserId = strUserId.replace(']','')

			
			hd1cas_db.query(`SELECT U.id, LC.mobile, FB.email FROM user AS U LEFT JOIN localaccount AS LC ON U.localAccId = LC.id LEFT JOIN facebookaccount AS FB ON U.fbAccId = FB.id WHERE U.id IN (${strUserId})`).then(([results, metadata]) => {
			let filtered = [];
			for (attribute in results) {
				let transaction=[]
				let methodName=[]
				results1.filter(function(oldData) {
					if (results[attribute].id===oldData.userId) {
						methodName.push(oldData.methodName)
						transaction.push({
							"id": oldData.transId,
							"methodName": oldData.methodName,
							"amount": oldData.amount
						})
					
						let uniqueMethod = Array.from(new Set(methodName));
						results[attribute].Transaction=transaction
						results[attribute].method=uniqueMethod
					}
				})
				
			}
			return ResponseService.json(200, res, sails.__("getmomo"), results)
		})
	}).catch(err => {
				console.error('Unable to connect to the database:', err);
			});
    },
    getVnpay: function (req, res){
		hd1payment_db.query("SELECT S.userId, C.transId, C.amount, S.id as sourceId, M.name as methodName FROM charge C JOIN source S  ON C.sourceId = S.id JOIN method M ON M.id = S.methodId WHERE M.id = '4365b41d-2f3a-11e9-84f9-0242ac110002' ").then(([results1, metadata]) => {
			var filtered = [];	
				var query= [];	
				var str = [];
				for(fillter in results1){
				str.push (results1[fillter].userId)
				}
				var strUserId = (JSON.stringify(str))
				strUserId = strUserId.replace('[','')
				strUserId = strUserId.replace(']','')

			
			hd1cas_db.query(`SELECT U.id, LC.mobile, FB.email FROM user AS U LEFT JOIN localaccount AS LC ON U.localAccId = LC.id LEFT JOIN facebookaccount AS FB ON U.fbAccId = FB.id WHERE U.id IN (${strUserId})`).then(([results, metadata]) => {
			let filtered = [];
			for (attribute in results) {
				let transaction=[]
				let methodName=[]
				results1.filter(function(oldData) {
					if (results[attribute].id===oldData.userId) {
						methodName.push(oldData.methodName)
						transaction.push({
							"id": oldData.transId,
							"methodName": oldData.methodName,
							"amount": oldData.amount
						})
					
						let uniqueMethod = Array.from(new Set(methodName));
						results[attribute].Transaction=transaction
						results[attribute].method=uniqueMethod
					}
				})
				
			}
			return ResponseService.json(200, res, sails.__("getvnPay"), results)
		})
	}).catch(err => {
				console.error('Unable to connect to the database:', err);
			});
			
	},
	
	getAsiapay: function (req, res){
		hd1payment_db.query("SELECT S.userId, C.transId, C.amount, S.id as sourceId, M.name as methodName FROM charge C JOIN source S  ON C.sourceId = S.id JOIN method M ON M.id = S.methodId WHERE M.id = 'aa52e1f3-fba4-11e5-b347-fa163ed1f292' ").then(([results1, metadata]) => {
			var filtered = [];	
				var query= [];	
				var str = [];
				for(fillter in results1){
				str.push (results1[fillter].userId)
				}
				var strUserId = (JSON.stringify(str))
				strUserId = strUserId.replace('[','')
				strUserId = strUserId.replace(']','')

			
			hd1cas_db.query(`SELECT U.id, LC.mobile, FB.email FROM user AS U LEFT JOIN localaccount AS LC ON U.localAccId = LC.id LEFT JOIN facebookaccount AS FB ON U.fbAccId = FB.id WHERE U.id IN (${strUserId})`).then(([results, metadata]) => {
			let filtered = [];
			for (attribute in results) {
				let transaction=[]
				let methodName=[]
				results1.filter(function(oldData) {
					if (results[attribute].id===oldData.userId) {
						methodName.push(oldData.methodName)
						transaction.push({
							"id": oldData.transId,
							"methodName": oldData.methodName,
							"amount": oldData.amount
						})
					
						let uniqueMethod = Array.from(new Set(methodName));
						results[attribute].Transaction=transaction
						results[attribute].method=uniqueMethod
					}
				})
				
			}
			return ResponseService.json(200, res, sails.__("getAsiaPay"), results)
		})
	}).catch(err => {
				console.error('Unable to connect to the database:', err);
			});
			
	}
} 