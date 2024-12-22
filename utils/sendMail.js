const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { escape } = require("html-escaper");
const { use } = require("passport");
const Imap = require('imap');
const {simpLeParse}= require('mailparser');
dotenv.config();
/**
 * Send an email to a user
 * @param} username - username of the mail server
 * @param} password - password of the mail server
 * @param} from -  where the mail is coming from
 * @param} to -  to where the mail is coming from
 * @param} subject -  the subject of the email
 * @param} name - property name of sender of email
 * @param} format -  format of the message i.e html or text
 * @param} html - the content of the message in html format
 * @param} text - the content of the message in text format
 * @returns a boolean promise
 */
async function sendMail(
    email,
    subject,
    format = 'html',
    name,
    html,
    text,
) {

    try {
        var transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',     //smtp.hostinger.com, // 'mail.mujaware.com',//gmail
            port: 587, //465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        var imap = new Imap({
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS,
            host: 'imap.titan.email',
            port: 993,
            tls: true
        });


        var mailOptions2 = {
            envelope: {
                from: 'aliyubello@mujaware.com',
                to: `${email}`
            },
            raw: `From: aliyubello@mujaware.com
            To:${email}
            Subject:${subject}

            ${text}`
        };

        var mailOptions = {
            // from: `${process.env.USER}, {name:"Aliyu Bello",address:${process.env.USER}}`,
            from: `${name ? name : "cShop"} <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            [format]: html ? html : text // or html:<html>It is easy</html>
        };

        const info = await transporter.sendMail(mailOptions);
        

        console.log('Email sent: ' + info.response);
        console.log('Info Object: ', info);

        // append the sent mail to the sent folder
        imap.once('ready', function () {
            imap.openBox('Sent', true, function (err) {
                if (err) {
                    console.log('Error: ', err);
                    imap.end();
                    return;
                } else {
                    console.log('Mail sent and appended to the sent folder');
                }
            });
        });

        return true;

    } catch (error) {
        console.warn(error);
        return false;
    }

}


/**
 * Send email to users
 * 
 * @param } username username of the mail server
 * @param} password password of the mail server
 * @param} from where the mail is coming from
 * @param} to to where the mail is coming from
 * @param} subject the subject of the email 
 * @param} senderName name of sender of email
 * @param} format format of the message i.e html or text
 * @param} messageHtml the content of the message in html format
 * @param} messageText the content of the message in text format
 * 
 * @returns result, a jso
 */

function sendMultipleMail(
    email,
    subject,
    format = 'html',
    messageHtml,
    messageText,
    senderName,
    ccList,
    bccList,
) {

    const emaile = escape(email);
    const subjecte = escape(subject);
    const htmle = escape(messageHtml);
    const texte = escape(messageText);
    const namee = escape(senderName);

    var transporter = nodemailer.createTransport({
        host: smtp.hostinger.com, // 'mail.mujaware.com',//gmail
        port: 587, //465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    var mailOptions = {
        from: `${namee ? namee : "Kulwek"} <${process.env.USER}>`,
        cc: [ccList ? ccList : ''],
        bcc: [bccList ? bccList : ''],
        to: emaile,
        subject: subjecte,
        [format]: htmle ? htmle : texte // or html:<html>It is easy</html>
    };

    let promise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });
    })

    return promise;
}

module.exports = {
    sendMultipleMail,
    sendMail
};

const ADDRESS_OBJECT_FORMAT =
    `
{
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
},

to: 'foobar@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
    
cc: [
    'foobar@example.com',
    '"Ноде Майлер" <bar@example.com>,
    "Name, User" <baz@example.com>'
],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        bcvxz

bcc: [
    'foobar@example.com',
    {
        name: 'Майлер, Ноде',
        address: 'foobar@example.com'
    }
]
`;