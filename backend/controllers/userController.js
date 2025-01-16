import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";


// @desc   Authencticate User
// @route  POST api/users/login
// @access Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user) {
        if (await user.matchPassword(password)) {
            // Generate Token
            generateToken(res, user._id);
            
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401);
            res.send("Invalid email or password");
        }
    
    } else {
        res.status(404);
        res.send("User not found");
        
    }
};


// @desc   Logout User and empty the cookie
// @route  POST api/users/logout
// @access PRIVATE
const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out" });
})



// @desc   Register User
// @route  POST api/users/register
// @access Private
const registerUser = asyncHandler(async (req, res) => {

    // Get the data from the body
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }
    
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        // Generate token
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }

})

export {
    authUser,
    registerUser,
    logOutUser
};