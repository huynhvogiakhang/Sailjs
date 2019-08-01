module.exports = function (req, res, next) {
    let token;
    if(req.headers.authorization){
      
      token = req.headers.authorization
    } else {
      return ResponseService.json(401, res, "No authorization header was found");
    }
  
    JwtService.verify(token, function(err, decoded){
      console.log("err " ,err)
      if (err) return ResponseService.json(401, res, "Invalid Token!");
      req.token = token;
      expire= 60*60*24
      redis.get('User:'+decoded.id, function(err,result){
        if (err){
          console.log('loi: ',err)
        }
        else {
          console.log(decoded.id)
          console.log('result:',result)
          redis.set('Userupdate:'+decoded.id,result,'EX',expire)
        }
      })
      User.findOne({id: decoded.id}).then(function(user){
        req.current_user = user;
        next();
      })
      var a= new Date()
      
      // Token.findOne({id: token}).then(function(token){
      //    a=token.ExpiredDate;
      // })
      a.setDate(a.getDate()+3) 
      
      Token.update({id: token}).set({
        ExpiredDate: a
      }).then (result => {
      })
      .catch(err => res.serverError(err));
      
    });
  
  }