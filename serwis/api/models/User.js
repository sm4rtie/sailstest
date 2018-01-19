/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    firstName : {
      type : 'string',
     // required: true
    },
    lastName: {
      type: 'string',
     // required: true,
    },
    email: {
      type: 'email',
      required: true
    },
    password : {
      type : 'string',
      required: true
    },
    role: {
      type: 'string',
      //required: true,
    },
    phone: {
      type: 'string',
      defaultsTo: '555-555-555'
      //required: false
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }


  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash);
          cb(null, user);
        }
      });
    });
  },
  beforeUpdate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash);
          cb(null, user);
        }
      });
    });
  }
};

