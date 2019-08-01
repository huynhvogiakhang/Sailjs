var jwt = require('jsonwebtoken');
var jwtSecret = "abc";

module.exports = {
  createToken: function (payload) {
    token = jwt.sign(payload, jwtSecret, {expiresIn: 180 * 60})
    return token
  },

  verify: function (token, callback) { 
    return jwt.verify(token, jwtSecret, callback);
  },

  // todo: (params, done) => {
  //   async.waterfall([
  //     (cb) => {
  //       if checknotequal 
  //         return done 
  //       return cb() 
  //     }
  //   ],
  //     done)
  // }
}