
module.exports = {
  sendWelcomeMail: function(obj) {
    sails.hooks.email.send(
      "sendMail",
      {
        Name: obj.firstName,
      },
      {
        to: obj.email,
        subject: "Welcome Email"
      },
      function(err) {
        console.log(err || "Mail Sent!");
      }
    )
  },
  sendContact: function(obj) {
    sails.hooks.email.send(
      "sendContact",
      {
        firstName: obj.firstName,
        lastName: obj.lastName,
        client: obj.client,
        orderId: obj.orderId,
        message: obj.message,
      },
      {
      to: "marta.jareckaa@gmail.com" ,
      subject: obj.orderId
  },
  function(err) {
    console.log(err || "Mail Sent!");
  }
    )
}
}
