const { Schema, model, default: mongoose, Collection } = require("mongoose");
const { strict } = require("../validators/auth-validators");
const { email } = require("zod");


const contactSchema = new Schema ({
    username: { type: String, require:true},
    email: { type: String, require:true},
    message: { type: String, require:true},

});


// create a model or a Collection

const  Contact = new model("Contact", contactSchema);

module.exports = Contact;