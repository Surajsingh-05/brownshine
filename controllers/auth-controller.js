const User = require(`../models/user-models`);
const bcrypt = require(`bcryptjs`);




// home login

const home = async (req, res) => {

    try {

        res.status(200).json('hello word! this is home page');
        
    } catch (error) {
        
        console.log("error")
    }

}

// register page
 
const register = async (req, res) => {
    try {

        const {username, email, phone, password } = req.body;
         

        const userExist = await User.findOne ({ email});


        if(userExist){
            
            return res.status(400).json({massage: "email alreaday exists"});
 
        }

       
       const userCreated = await User.create({username, email, phone, password});

        res.status(201).json(
            {
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
            });

   } catch (error) {
            // console.log(error);
        res.status(500).json(error);
    }
};


// user login logic

const login =  async (req, res) =>{

    try {
     
       const {email, password} = req.body;
       
       const userExist = await User.findOne({email});

       if(!userExist){
        return res.status(400).json({massage: "invalid detalis"});
       }

       const user = await bcrypt.compare(password, userExist.password);
    //    const user = await userExist.comparepassword (password);
     

       if(user){
         
          res.status(201).json(
            {
            msg: "login successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString()
            });
       }else{
        
        res.status(401).json({massage:"invelid user" });
       }
        
    } catch (error) {
           
        res.status(500).json("internel server error");
    }
}

// to send user data - user logic

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData});
    } catch (error) {
        console.log(`error from the user route ${error}`);
        
    }

};



module.exports = {home , register , login , user};