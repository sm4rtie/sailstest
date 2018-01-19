var passport = require('passport');

module.exports = {

  login: function(req, res) {
    if(req.isAuthenticated()) {
      return res.redirect('/User?email='+req.session.email)
    }
    else res.view();
  },
  process: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if( (err)||(!user) ) {
        return res.send({
          message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if(err) res.send(err);
        /*return res.send({
          message: 'login successful'
        });*/
        //return res.json(user);
        req.session.email = user.email;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.role = user.role;
        res.redirect('/User?email='+user.email);
      });
    }) (req, res);
  },

  logout: function(req, res) {
    req.logOut();
    req.session.email = "";
    res.send('logout successful');
  }
};

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};
