module.exports = function (req, res, next) {
    
    locale = req.headers.acceptlanguage
    if (locale == "vi") {
      sails.hooks.i18n.setLocale('vi')
      
       next();
    }else {
      sails.hooks.i18n.setLocale('en')
      next();
    }
    
  }