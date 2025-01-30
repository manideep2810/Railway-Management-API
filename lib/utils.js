import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId, role , res) => {
    const token = jwt.sign({userId,role},JWT_SECRET,{
        expiresIn : "7d",
    });

    res.cookie("jwt",token,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "strict",
        secure : false
    });

    return token;
};