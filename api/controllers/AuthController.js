
module.exports = {

    login: function (req, res) {
      console.log(req.allParams())
      var fullName = req.param('fullName');
      var password = req.param('password');
  
      verifyParams(res, fullName, password)
  
      User.findOne({fullName: fullName}).then(function (user) {
        if (!user) {
          return invalidEmailOrPassword(res);
        }
      
        signInUser(req, res, password, user)
        
      }).catch(function (err) {
        console.log(err)
        return invalidEmailOrPassword(res);
      })
    }
  
  };
  
  
  function signInUser(req, res, password, user) {
    User.comparePassword(password, user).then(
      function (valid) {
        if (!valid) {
          return this.invalidEmailOrPassword();
        } else {
          expire= 60*60*24
          
          
          var gToken=generateToken(user.id)
          
          redis.set('User:'+user.id,gToken,'EX',expire)
          now= new Date()
          now.setDate(now.getDate()+3)
          Token.create({
            id: gToken,
            ExpiredDate: now
          }).then(Token => {
            
            
            var responseData = {
              user: user,
              token: gToken
            }
            return ResponseService.json(200, res, "Successfully signed in", responseData)
          }).catch(error => {
            
            
            if (error.invalidAttributes){
            
              return ResponseService.json(400, res, "Token could not import", error.Errors)
            }
          }
        )
        
          
        }
      }
    ).catch(function (err) {
      console.log(err)
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
