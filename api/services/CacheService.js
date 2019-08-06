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
    expired: function(id) {
        redis.del('User'+id)
    }
}