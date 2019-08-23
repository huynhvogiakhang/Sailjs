var uuid = require('uuid/v4');  
var message= sails.config.message
module.exports = {
    sequelize: function(req,res) {
      var sequelize = new Sequelize('mysql://root:root@localhost:3306/sails');
      
        sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
      })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
      });
      
    },
    login: function (req, res) {
      var platform = req.param('platform');
      var fullName = req.param('fullName');
      var password = req.param('password');
      console.log(req.url)
      verifyParams(res, fullName, password)
  
      User.findOne({fullName: fullName}).then(function (user) {
        if (!user) {
          return invalidEmailOrPassword(res);

        }
      
        signInUser(req, res, password, user, platform)
        
      }).catch(function (err) {
        console.log('err login: ',err)
        return invalidEmailOrPassword(res);
      })
    },
    logout: function (req, res, err, user) {
      let attributes = {}
      JwtService.verify(token, function(err, decoded){
        if (err) return ResponseService.json(401, res, "Invalid Token!");
        if (req.param('platform')){
            attributes.status = "Expired"
          }
          
          Platform.update({
            id : decoded.id,
            platform: req.param('platform')
          },attributes
          )
          .then (users => {
            res.ok('Log out successfully');
          })
          .catch(err => res.serverError(err));
      })
          
      }
  
  
  };
  
  
  function signInUser(req, res, password, user, platform) {
    User.comparePassword(password, user).then(
      function (valid) {
        if (!valid) {
          return this.invalidEmailOrPassword();
        } else {
          expire= 60*60*24
          var gToken=generateToken(user.id)
          CacheService.importData(user.id,gToken,expire)
          now1= new Date()
          CacheService.importBackupData(gToken)
            var responseData = {
              user: user,
              token: gToken,
              platform: platform,
              Date: now1
            }
            Platform.create({
              platformId: uuid(),
              id: user.id,
              platform : responseData.platform,
              date: responseData.Date,
              status: "Active"
            }).then(user => {})
            return ResponseService.json(200, res, sails.__("LoginSuccess"), responseData)
        }
      }
    ).catch(function (err) {
      console.log('err: ',err)
      return ResponseService.json(403, res, "Forbidden")
    })
  };
  
  
  function invalidEmailOrPassword(res){
    return ResponseService.json(401, res, "Invalid email or password")
  };
  
  function verifyParams(res, email, password){
    if (!email || !password) {
      return ResponseService.json(401, res, "Email and password required")
    }
  };
  
  
  function generateToken(user_id) {
    return JwtService.createToken({id: user_id})
  
};
