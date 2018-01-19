/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
  show: function(req, res){
    var params = req.params.all()
    var email = req.session.email;
    console.log(req.session.passport);

    User.findOne({email: params.email}).exec(function createCB(err, user) {

      if (err) {
        return res.serverError(err);
      }
      User.find({role: "employee"}).exec(function findEmployees(err, employees )
      {
        if (err) {
          return res.serverError(err);
        }
        Order.find({
          or: [
            {client: email},
            {employee: email}
          ]
        }).exec(function createCB(err, orders) {
          var statuses = Order.attributes.status.enum;
          if (err) {
            return res.serverError(err);
          }
          res.view('user', {user: user, orders: orders, statuses: statuses, employees: employees}); //done
        });
      });
    });
  },
  create: function(req, res){
    //var params = req.params.all()
    var params = req.body;
    User.create({email: params.newUserEmail, firstName: params.newUserFirstName, lastName: params.newUserLastName, phone: params.newUserPhone, password: params.newUserPassword}).exec(function createCB(err,created){
      if (err) {
        return res.serverError(err);
      }
      return res.redirect('back');
    });
  },

  me: function(req, res){
    var email = req.session.email;

    User.findOne({email: email}).exec(function update(err, user) {
      if (err) {
        return res.serverError(err);
      }
      return res.view('user/me', {user: user});
    });
  },

update: function(req, res){
  var params = req.params.all();
  var email = req.session.email;
  var body = req.body;
  console.log(body);
  User.findOne({email: email}).exec(function update(err, user) {
    if (err) {
      return res.serverError(err);
    }
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.phone = body.phone;
    user.email = body.email;
    var hashPass;
    if(body.newPassword !== "") {
      function f(user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(body.password, salt, function (err, hash) {
            if (err) {
              console.log(err);

            } else {
              bcrypt.compare(user.password, hash, function (err, res) {
                if (!res) return console.log("compare nieudany");
                //return res.json({message: 'Invalid Password'});
                console.log(hash);
                cb(null, user);
              });
            }
          });

        });
      }
    }
    console.log(body.newPassword);
    if(body.newPassword === body.newPasswordConfirm) {
    user.password = body.newPassword; }
    //console.log(user);
    user.save(function(err){
      console.log('success!');
    });
    return res.redirect('back');

  });
}
};

