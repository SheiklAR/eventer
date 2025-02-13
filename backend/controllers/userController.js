import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";


// @desc   Authencticate User
// @route  POST api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
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
});


// @desc   Logout User and empty the cookie
// @route  POST api/users/logout
// @access PRIVATE
const logOutUser = asyncHandler(async (req, res) => {
    
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "Strict"
    })

    res.status(200).json({ message: "logged out successfully, cookies deleted" });
});


// @desc   Register new user
// @route  POST api/users/register
// @access PRIVATE
const registerUser = asyncHandler(async (req, res) => {
    // extract data from the request body
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // Check if we already have the user
    if (existingUser) {
        res.status(409).json({ 'message': 'User already exists, Login' });
    }

    try {
        // Create a new user
        const user = await User.create({ name, email, password });

        // Generate token
        generateToken(res, user._id);

        res.status(201).json({
            'id': user._id,
            'email': user.email,
            'name': user.name
        })
            
    } catch (err) {
        res.status(400).json({ message: err.message || "User registeration failed" });
    }

});


export {
    authUser,
    registerUser,
    logOutUser
};