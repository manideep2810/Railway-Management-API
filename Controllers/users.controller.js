import pg from "pg";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import db from '../Models/database.js'


export const signup = async (req,res) => {
    let {name,email,password} = req.body;
    try{
        // console.log("right here!");
        // console.log(req.body);
        if(password.length < 6){
            return res.status(400).json({message : "password must be atleast 6 characters"});
        }

        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        // console.log(result);
        if(result.rows.length > 0){
            return res.status(400).json({message : "Email already exists"});
        }
        // return res.send("Hi");
        bcrypt.hash(password , 10 , async (err,hash)=>{
            if(err){
                return res.status(400).json({message : "Some Internal Error"});
            }
            let result1 = await db.query("INSERT INTO users (email,name,password) VALUES ($1,$2,$3) RETURNING *",[email,name,hash]);
            
            generateToken(result1.rows[0].id , "user"  , res);
            // console.log(result1);
            return res.status(201).json({
                id : result1.rows[0].id,
                name : result1.rows[0].name,
                email : result1.rows[0].email,
            });
        })
    } catch(err){
        console.log("Error in users signup controller",err.message);
        res.status(500).json({message : "internal server Error"});
    }
}

export async function login(req,res){
    const { email, password } = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        if(result.rows.length === 0){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        bcrypt.compare(password , result.rows[0].password , (err,same)=>{
            if(err){
                console.log(err.message);
                return res.status(500).json({ message: "Internal Server Error in comparing passwords" });
            }
            if(!same){
                return res.status(400).json({ message: "Invalid credentials" });
            }
            
            generateToken(result.rows[0].id, "user" , res);
            return res.status(201).json({
                id : result.rows[0].id,
                name : result.rows[0].name,
                email : result.rows[0].email,
            });
            
        })
    } catch (error) {
        console.log("Error in users login controller",err.message);
        res.status(500).json({message : "internal server Error"});
    }
}

export function logout(req,res){
    try {
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message : "Logged out Succesfully"});
    } catch (error) {
        console.log("Error in users logout controller",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}



export async function checkAuth(req,res) {
    try{
        res.status(200).json(req.user);
    } catch (err){
        res.status(500).json({message : "Internal Server Error in checkAuth"});
    }
}


