Redis = require("ioredis");
redis = new Redis();


module.exports = {
    importData: function(id,data,duration) {
        redis.set('User:'+id,data,'EX',duration)
    }
}