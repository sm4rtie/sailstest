module.exports = {

  findOrders: function(email) {
    {
      // here you call your models, add object security validation, etc...
      return Order.findByClient({client: email});
    }
  }
};
