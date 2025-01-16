const { hashpass } = require("../../utils/hashHelper");
const { Mutex } = require("async-mutex");
const { User } = require("../models/user.model");
const { Profile } = require("../../profiles/models/profile.model");
const Joi = require('joi');
const { escape } = require('html-escaper');
const { sendMail } = require("../../utils/sendMail");
const { confirmHTMLMSG } = require("../../utils/confirmRegistrationHTML");
const { v4: uuidv4 } = require('uuid');


// create mutex instance
const mutex = new Mutex();

/**
 * Register new user
 * @param {object} req - user request object
 * @param {object} res - response to user request
 * @returns void
 */
const registerUserHandler = async (req, res) => {
    // acquire access to path, lock it to prevent race condition
    const release = await mutex.acquire();
    try {
        // get the reaquest body data
        const {
            password,
            email
        } = req.body;

        // declare clientData
        let clientData;
        // get user role
        let role = req.body.role ?? "user";
        let firstName = req.body?.firstName ?? "";
        let lastName = req.body?.lastName ?? "";
        let subdomain = req.body?.subdomain ?? "maindomain"
        let businessName = req.body?.businessName ?? ""


        // let us validate inputs
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().required(),
            role: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            subdomain: Joi.string(),
            businessName: Joi.string()
        });

        const { error, value } = schema.validate({ email, password, role, firstName, lastName, subdomain, businessName });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {
            // let us sanitize our inputs
            // initilise client data and escape each client details to protect XSS attack
            clientData = {
                // let us sanitize our inputs
                emailx: escape(email),
                passwordx: escape(password),
                rolex: escape(role),
                firstNamex: escape(firstName),
                lastNamex: escape(lastName),
                subdomainx: escape(subdomain),
                businessNamex: escape(businessName)
            }
            // hash the user password
            const hassPassword = hashpass(clientData.passwordx);
            // enter data to users table
            const user = await new User({ email: clientData.emailx, password: hassPassword, role: clientData.rolex, subdomain: clientData.subdomainx }).save();
            // check if insert Id is defined
            if (user._id) {
                let profile;
                // create user profile
                if (clientData.businessNamex && clientData.subdomainx) {
                    profile = await Profile.create({
                        user: user._id,
                        businessName: clientData.businessNamex,
                        subdomain: clientData.subdomainx
                    });
                } else {
                    profile = await Profile.create({
                        user: user._id,
                        firstName: clientData.firstNamex,
                        lastName: clientData.lastNamex
                    });
                }

                user.profile = profile._id;

                await user.save();

                const rcode = uuidv4();

                try {
                    // send email to user
                    await sendMail(user.email, "Registration successful", 'html', 'cshop', confirmHTMLMSG(user.email, rcode), '');
                } catch (error) {
                    console.log(error);
                }
                // send result in json data
                res.status(200).json({
                    status: "success",
                    message: "registration successful",
                    data: {
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                        firstName: profile.firstName ?? "",
                        lastName: profile.lastName ?? "",
                        businessName: profile.businessName ?? "",
                        subdomain: profile.subdomain ?? ""
                    }
                });
            }

        }

    } catch (error) {
        //   catch escapeHTML error
        console.log(error);
        res.status(400).json({
            status: "failed",
            message: "Error: " + error.message,
            data: null
        });
    } finally {
        // release path for other
        release();
    }

}

module.exports = {
    registerUserHandler
}