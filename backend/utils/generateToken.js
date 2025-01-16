import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // Create json web token
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set token as http-only cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};


export default generateToken;