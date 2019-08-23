module.exports = function (req, res, next) {
    let token;
    
    if(req.headers.authorization){
      
      token = req.headers.authorization
      console.log(token)
    } else {
      return ResponseService.json(401, res, "No authorization header was found");
    }
  //  function resolve(cb){
  //   // do some thing
  //   if err
  //     return res.badR
  //   if done 
  //     return cb()
    
  //     fdsfdsfsfds

  //     fdsfdsfsfds
  //  }
  //  async.waterfall([
  //    checkauthen
  //    activetoken

  //  ], (err, result) => {
  //    if err res.badRe
  //    res.ok
  //  })
    JwtService.verify(token, function(err, decoded){
      sails.hooks.i18n.setLocale('de');
      
      if (err) return ResponseService.json(401, res, "Invalid Token!");
      
      expire= 60*60*24
      
      // User.findOne({id: decoded.id}).then(function(user){
      //   req.current_user = user;
      //   next();
      // })
      var a= new Date()
      var b=0
      CacheService.getBackup(token)
      
      var z=sails.__(
        "Welcome"
      )
      console.log(z)
      Token.findOne({id: token}).then(function(token){
         
         a=token.ExpiredDate
         b= token.Status
         if (b==0) {
           return ResponseService.json(401, res, "Token expired!");
           
         }
         a.setDate(a.getDate()+3) 
         return Token.update({id: token.id}).set({
            ExpiredDate: a
          })
        }).then (function(){
          
           if (b==1)
           {
              CacheService.importData(decoded.id,token,expire)
           }
           next();
      }).catch(err => res.serverError(err));
    
      // }).then (result => {
      // })
      // .catch(err => res.serverError(err));
      
    });
  
  }