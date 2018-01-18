module.exports = {
  create: function(req, res){
    var params = req.params.all()
    Contact.create({orderId: params.orderId, client: params.email, message: params.message}).exec(function createCB(err,created){
      if (created) {
        Mailer.sendWelcomeMail(result);
        res.json(200, {result: result});
      }
    });
  }
};
