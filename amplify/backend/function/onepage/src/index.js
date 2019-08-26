var AWS = require("aws-sdk");
var ses = new AWS.SES();

exports.handler = (event, context) => {
  //console.log(`EVENT: ${JSON.stringify(event)}`);

  let body = JSON.parse(event.body);

  let name = body.name;
  let email = body.email;
  let phone = body.phone;
  let message = body.message;

  let params = {
    Destination: {
      ToAddresses: ["ggercu@gmail.com"]
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Test Email"
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<p>Name: " + name + "</p><p> Phone: " + phone + "</p><p> Message: " + message + "</p>"
        },
        Text: {
          Charset: "UTF-8",
          Data: "Name: " + name + " Phone: " + phone + " Message: " + message
        }
      }
    },
    Source: "test@ggertz.com",
    ReplyToAddresses: [email]
  };
  ses.sendEmail(params, function (err, data) {
    if (err) {
      console.log("error!")
      console.log(err);
      return context.fail(err);
    } else {
      console.log("Email sent");

      let response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
      };
      context.succeed(response);
    }
  });

};