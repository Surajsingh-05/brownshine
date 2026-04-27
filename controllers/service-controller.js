const Service = require("../models/service-model");


const services = async (req, res) => {
    try {
        const response = await Service.find();
       
        
        if(!response || response.length === 0){

        return res.status(404).json({ msg: "No Service found"});

        

        }


        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`services: ${error}`);
        return res.status(500).json({ msg: "Database connection error" });
        
    }
};

module.exports = services;