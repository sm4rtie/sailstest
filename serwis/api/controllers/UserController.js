/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var orderController = require('./OrderController');

module.exports = {
  show: function(req, res){
    var params = req.params.all()
    var email = req.param("email");
    console.log(email);
   //var params = res.locals.user;

    User.findOne({email: params.email}).exec(function createCB(err,result) {

        console.log(result);
      if (err) {
        return res.serverError(err);
      }
    //if (result) {
       // Mailer.sendWelcomeMail(result); }
      //region wyszukiwanie orderów danego usera
      Order.find({employee: result.email}).exec(function createCB(err,orders){

        if(err) return err;
        console.log(orders);
        res.view('user', {result:result,orders:orders}); //done


      });

    });
  },
  /*create: function(req, res){
    var params = req.params.all()
           if (result) {
          Mailer.sendWelcomeMail(result);
          res.json(200, {result: result});
        }
    User.create({name: params.name}).exec(function createCB(err,created){
      return res.json({
        notice: 'Created user with name ' + created.name
      });
    });
  },
  login: function (req, res) {

    User.findOne({email: req.param('email')}).exec(function createCB(err,result){
      / return res.json({
          notice: 'Found id: ' + result._id
        });
    });
    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      /*name: 'result.firstName',
      lastName: 'result.lastName',
      _id: 'result._id',
     successRedirect: '/user',
      invalidRedirect: '/login',

    });

  },
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  }*/
};

