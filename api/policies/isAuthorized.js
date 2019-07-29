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
      User.findOne({id: decoded.id}).then(function(user){
        req.current_user = user;
        next();
      })
    });
  
  }