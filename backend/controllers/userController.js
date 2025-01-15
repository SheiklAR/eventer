import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/model.js";
import jwt from "jsonwebtoken";


// @desc   Authencticate User
// @route  GET api/users/login
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
        throw new Error("User not found");
        
    }
};

// @desc   Register User
// @route  POST api/users/register
// @access Private
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // const user = await User.create({ email, password });
    
    res.send('register user');
}


export { authUser, registerUser };