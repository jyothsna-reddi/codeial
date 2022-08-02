const { SchemaType } = require("mongoose");
const nodemauler = require("nodemailer");
let testaccount = nodemauler.createTestAccount();
const ejs = require("ejs");
const path = require("path")
const transporter = nodemauler.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    service : "gmail",
    auth : {
        user : "connector.socialmedia27@gmail.com",
        pass : "rgbkympjuguluqpw"
    }
})

  // send mail with defined transport object
  let renderTemplate = function(data,relativepath) {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativepath),
        data,
        function (err,template) {
            if(err){
                console.log("error in rendering file",err);
                return;
            }
            mailHtml = template
        }
    )
    return mailHtml;
  }
  module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate,
  }