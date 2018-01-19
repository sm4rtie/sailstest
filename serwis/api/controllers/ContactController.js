module.exports = {
  create: function(req, res){
    var params = req.params.all()
    var email = req.session.email;
    Contact.create({orderId: params.orderId, client: email, message: params.message}).exec(function createCB(err,created){
      if (created) {
        created.firstName = req.session.firstName;
        created.lastName = req.session.lastName;
        console.log(created);
        Mailer.sendContact(created);
        //res.json(200, {created: created});
        res.redirect('/contact');
      }
    });
  },
  findOrders: function(req, res){
    var email = req.session.email;
    console.log(email);

    Order.find({
      or: [
        {client: email},
        {employee: email}
      ]
    }).exec(function findOrders(err, orders){
      if (err) {
        return res.serverError(err);
      }
      console.log(orders[0].id);
      res.view('contact', {orders: orders, sent: true}); //done

    });
  }
};
