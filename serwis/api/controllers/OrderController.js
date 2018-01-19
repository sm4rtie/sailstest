module.exports = {
  create: function(req, res){
    var params = req.body;
    console.log(params)
    Order.create({client: params.newOrderClient, employee: params.newOrderEmployee, product: params.newOrderProduct, status: params.newOrderStatus}).exec(function createCB(err,created){
      if (err) {
        return res.serverError(err);
      }
      return res.redirect('back')
    });
  },
  findOrders: function(email){
    Order.find({client: email}).exec(function createCB(err,orders){
      if (err) {
        return res.serverError(err);
      }
      return orders;
    });
  },
  update: function(req, res){
    var params = req.body;
    Order.findOne({id: params.orderId}).exec(function update(err, order){
      if (err) {
        return res.serverError(err);
      }
      order.status = params.updateStatus;
      order.save(function(err){
        if (err) {
          return res.serverError(err);
        }
        console.log('Status updated to '+order.status);
      });
    });
    res.redirect('back');
  }
};
