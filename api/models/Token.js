var Promise = require("bluebird");
var bcrypt = require("bcrypt")

module.exports = {

  attributes: {
    id: {
      type: 'string',
      required: true,
      unique: true
    },
    ExpiredDate: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
      unique: true
    }
  } 
};
