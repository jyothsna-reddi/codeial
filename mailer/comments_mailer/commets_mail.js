const nodemailer = require("../../config/nodemailer");

exports.newcomment  = (comment) =>
{
    console.log("inside comment mailer");
    let htmlstring = nodemailer.renderTemplate({comment:comment},"/comments/new_comment.ejs")
    nodemailer.transporter.sendMail({
        from : "divyareddy271999@gmail.com",
        to : comment.user.email,
        subject: "new comment published",
        html : htmlstring,
    },(err,info)=> {
        if(err){
            console.log("eror in publishing email",err);
            return;
        }
        console.log("mail sent successfully",info);
        return;
    }
    )
}