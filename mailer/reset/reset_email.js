const nodemailer = require("../../config/nodemailer");

exports.reset  = (reset) =>
{
    console.log("inside reset mailer");
    let htmlstring = nodemailer.renderTemplate({reset:reset},"/reset_mail/new_reset.ejs")
    nodemailer.transporter.sendMail({
        from : "divyareddy271999@gmail.com",
        to : reset.user.email,
        subject: "Reset Password",
        html : htmlstring,
    },(err,info)=> {
        if(err){
            console.log("eror in publishing reset email",err);
            return;
        }
       // console.log("mail sent successfully",info);
        return;
    }
    )
}