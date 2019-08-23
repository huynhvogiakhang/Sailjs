var Promise = require("bluebird");
var bcrypt = require("bcrypt")

module.exports = {

  attributes: {
    id: {
      type: 'string',
      required: true,
      unique: true
    },
    fullName: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      columnName: "encryptedPassword"
    },
    email: {
      type: 'string',
      required: true
    }
  },

  toJSON: function(){
    var obj = this.toObject()
    delete obj.password
  },
    
  beforeCreate: function(values, cb){
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  },
  
  comparePassword: function (password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      })
    });
  }

};
