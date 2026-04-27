const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const next = require("express");




const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
     email:{
        type:String,
        require:true,
    },
     phone:{
        type:String,
        require:true,
    },
     password:{
        type:String,
        require:true,
    },
     isAdmin:{
        type:Boolean,
        default:false,
    },
});


// secure the password with the bcrypt

userSchema.pre('save', async function (next){

    // console.log("premethod", this);

    const user = this;

    if(!user.isModified("password")){
       next();
    }

    try {
        const hash_password = await bcrypt.hash(user.password, 10);
        user.password = hash_password;
    } catch (error)
    {
        // console.log(error);
       next(error);
    }

});


// campare the password

userSchema.method.comparepassword = async function (password)  {
  return bcrypt.compare(password, this.password);
    
};


//json web token 
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
    } catch (error) {
        console.log("token error:", error);
    }
};

//define the model or the collection name

const User = new mongoose.model("USER",userSchema);

module.exports = User;


 