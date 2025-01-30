import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import pg from "pg";


const db = new pg.Client({
    database : "IRCTC",
    password : "Collage@2022",
    host : "localhost",
    port : 5432,
    user : "postgres"
});

const JWT_SECRET = process.env.JWT_SECRET;

db.connect();

export async function protectRoute(req,res,next){
    try {
        // console.log(req.body);
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decode = jwt.verify(token,JWT_SECRET);

        if(!decode){
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        console.log(decode);
        // console.log("Inside protectRoute");
        const result = await db.query("SELECT * FROM users WHERE id = $1",[decode.userId]);
        const user = result.rows;
        if(user.length === 0){
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user[0];
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error in protectRoute" });
    }
    
}

export async function adminProtectRoute(req,res,next){
    const api_key = req.query.api_key;
    // console.log(api_key);
    try {
        // console.log(req.body);
        const token = req.cookies.jwt;
        console.log(token);

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token Provided" });
        }

        if(!api_key){
            return res.status(401).json({ message: "Unauthorized - No api_key Provided" });
        }

        const decode = jwt.verify(token,JWT_SECRET);

        if(!decode){
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        console.log(decode);
        // console.log("Inside protectRoute");
        // console.log(decode);
        const result = await db.query("SELECT * FROM admins WHERE id = $1 and api_key = $2",[decode.userId,api_key]);
        const user = result.rows;
        if(user.length === 0){
            return res.status(404).json({ message: "Invalid API_KEY" });
        }
        req.user = user[0];
        next();
    } catch (error) {
        console.log("Error in admin protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error in protectRoute" });
    }
}