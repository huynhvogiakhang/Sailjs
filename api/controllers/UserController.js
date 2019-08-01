var uuid = require('uuid/v4');  
module.exports = {
 
  get: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) {
        return res.json(err);
      }
      
      return res.json(users);
    });
  },
  create: function(req,res){
    dataReq=req.allParams()
    User.create({
      id:uuid(),
      fullName: req.param('fullName'),
      password: req.param('password'),
      email: req.param('email')
    }).then(user => {
        
      var responseData = {
        user: user,
        // token: JwtService.createToken({id: user.id})
      }
      return ResponseService.json(200, res, "User created successfully", responseData)
    }).catch(error => {
        
        if (error.invalidAttributes){
            
          return ResponseService.json(400, res, "User could not be created", error.Errors)
        }
      }
    )
  },
  
  delete: function(req,res){
    User.destroy({
      id : req.param('id'),
    })
    .then (users => {
      return res.ok('Delete User successfully')
    })
    .catch(err => res.serverError(err));
  },
  // todo: (req, res) => {
  //   jwtService.todo(params, (err, result) => {
  //     if err return res.id

  //   })
  // }
   update: function(req,res){
    
    let attributes = {}

    if (req.param('fullName')){
      attributes.fullName = req.param('fullName')
    }

    if (req.param('password')){
      attributes.password = req.param('password')
    }

    if (req.param('email')){
      attributes.email = req.param('email')
    }
    User.update({
      id : req.params.id
    },attributes
    )
    .then (users => {
      res.ok('Update successfully');
    })
    .catch(err => res.serverError(err));
  }
};