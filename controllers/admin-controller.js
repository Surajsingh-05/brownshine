const User = require("../models/user-models");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
const { response } = require("express");


// get all user logic

const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find({} , { password: 0 });
        console.log(users);
        if(!users || users.length === 0){
            return res.status(404).json({message: "No Users Found"});
        }
       return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }

};


// simgle user logic

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data =await User.findOne({ _id:id }, { password:0 })
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }

};


// user update logic

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({ _id: id}, {
            $set: updatedUserData,

        }
    );

    return res.status(200).json(updatedData);



    } catch (error) {
        next(error);
    }

}

// user delete logic

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id})
        return res.status(200).json({message: "User deleted Successfully" });
    } catch (error) {
        next(error);
    }

};

// get all contact logic

const getAllContacts = async (req , res, next) => {
    try {
        const contacts = await Contact.find();
         if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No Contacts Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }

};

// delete contact logic
const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id});
        return res.status(200).json({message: "Contact deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

// get all services logic
const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        if(!services || services.length === 0){
            return res.status(404).json({message: "No Services Found"});
        }
        return res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

// get single service logic
const getServiceById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Service.findOne({ _id: id });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// add service logic
const addService = async (req, res, next) => {
    try {
        const serviceData = req.body;
        const newService = await Service.create(serviceData);
        return res.status(201).json({message: "Service added successfully", service: newService});
    } catch (error) {
        next(error);
    }
};

// update service logic
const updateServiceById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedServiceData = req.body;
        const updatedData = await Service.updateOne({ _id: id }, {
            $set: updatedServiceData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

// delete service logic
const deleteServiceById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({ _id: id });
        return res.status(200).json({message: "Service deleted successfully"});
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    getAllUsers, 
    getAllContacts, 
    deleteUserById, 
    getUserById, 
    updateUserById, 
    deleteContactById,
    getAllServices,
    getServiceById,
    addService,
    updateServiceById,
    deleteServiceById
};