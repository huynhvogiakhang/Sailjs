/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': ['isAuthorized'],
  
  'MomoController':{
      'getMomo':true,
      'getAsiapay':true,
      'getVnpay':true,
  },
  'UserController': {
    'create': true,
    'forgot':['setLanguage'],

  },

  'AuthController': {
    'login': 'setLanguage',
    'sequelize' : true
  },
  'LogOutController':{
    'logout':['setLanguage', 'isAuthorized']
  }
};
