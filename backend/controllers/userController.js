import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/model.js";
import jwt from "jsonwebtoken";


// @desc   Authencticate User
// @route  POST api/users/login
// @access Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user) {
        if (await user.matchPassword(password)) {

            // Create json web token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });

            // Set token as http-only cookie
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            
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
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // const user = await User.create({ email, password });
    
    res.send('register user');
}


export {
    authUser,
    registerUser,
    logOutUser
};