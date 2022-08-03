const queue = require("../../config/kue");
const comments_mailer = require("../../mailer/comments_mailer/commets_mail")

queue.process("emails",function(job,done){
    console.log("workers email is processing");
    comments_mailer.newcomment(job.data);
    done();
})