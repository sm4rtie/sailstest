
module.exports.sendWelcomeMail = function(obj) {
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
}
