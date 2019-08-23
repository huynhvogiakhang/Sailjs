Redis = require("ioredis");
redis = new Redis();


module.exports = {
    importData: function(id,data,duration) {
        redis.set('User:'+id,data,'EX',duration)
    },
    getData: function(id,cb) {
        redis.get('User:'+id).then(function(result) {
            
            return cb(result)
        })
        
    },
    dell: function(id) {
        redis.del('User'+id)
    },
    importBackupData: function(id) {
        now= new Date()
        now.setDate(now.getDate()+3)
        Token.create({
            id: id,
            ExpiredDate: now,
            Status: 1
          }).then().catch(function(err) {
              console.log('import data err ',err)
          })
    },
    getBackup: function(id) {
        Token.findOne({id: id}).then(function(token){
            a=token.ExpiredDate
            b= token.Status
            if (b==0) {
                return ResponseService.json(401, res, "Token expired!");
                
              }
              a.setDate(a.getDate()+3) 
              return Token.update({id: token.id}).set({
                 ExpiredDate: a
               })
            }).catch(err=> console.log(err)) 
    },
    deleteBackup: function(id) {
        Token.destroy({
            id : id,
          })
          .then (users => {
            return res.ok('Delete User successfully')
          })
          .catch(err => res.serverError(err));
    }
}