const {z} = require("zod");



const loginSchema = z.object({

     email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address"})
    .min(3, { message: "email must be at lest of 3 chars"})
    .max(255, { message: "email must not be more then 255"}),

     password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "password must be at lest of 6 chars"})
    .max(1024, { message: "name must not be more then 1024"}),


})
// creating a object schema

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name must be at lest of 3 chars"})
    .max(255, { message: "name must not be more then 255"}),


   

    phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be at lest of 10 chars"})
    .max(20, { message: "phone must not be more then 20"}),


   

});


module.exports = { signupSchema, loginSchema };