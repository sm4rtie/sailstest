module.exports = {
  create: function(req, res){
    var params = req.params.all()
    Contact.create({employee: params.employee, client: params.client, status: params.status}).exec(function createCB(err,created){
      return res.json({
        notice: 'Created user with name ' + created.name
      });
    });
  },
  findOrders: function(email){
   // var params = req.params.all();
    Order.find({client: email}).exec(function createCB(err,orders){
     // console.log(email);
     // console.log(orders);
      if(err) return err;
      return orders;
      //res.view('order', {orders: orders})
    });
  }
};
