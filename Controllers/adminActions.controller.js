import pg from "pg";
import crypto from "crypto";
import db from '../Models/database.js'



export const addTrain = async (req,res)=>{
    const {start_station,end_station,seats_available} = req.body;
    try {
        if(!start_station || !end_station || !seats_available){
            return res.status(400).json({"Error" : "All Feilds are Required"});
        }
        const result1 = await db.query("INSERT INTO trains (start_station,end_station,seats_available,seats_filled) VALUES ($1,$2,$3,$4) RETURNING *",[start_station,end_station,seats_available,0]);
        return res.status(200).json(result1.rows[0]);
    } catch (error) {
        console.log("Error in adminActions controller",error.message);
        return res.status(404).json({"Error":error.message});
    }
}

export const modifyAvailability = async (req,res)=>{
    const id = req.body["id"];
    const seats_available = req.body["seats_available"];
    try {
        if(!id || !seats_available){
            return res.status(404).json({"Error":"Please Enter the Train Id and seats_available"});
        }

        const result = await db.query('SELECT * FROM trains WHERE id = ($1)',[id]);
        if(result.rows.length === 0 ){
            return res.status(400).json({"Error":"No Trains Found With Specified ID"});
        }

        const trains = result.rows;
        if(trains.seats_filled > seats_available){
            return res.status(400).json({"Error":"Already there a enough bookings than specified"});
        }

        const result1 = await db.query('UPDATE trains SET seats_available = ($2) WHERE id = ($1) RETURNING *',[id,seats_available]);
        console.log();
        return res.status(200).json(result1.rows[0]);
    } catch (error) {
        console.log('Error in ModifyAvailability in adminActionsController',error.message);
        return res.status(404).json({"Error":error.message});
    }
}

export const generateAPIKEY = async (req,res) => {
    const id = req.user.id;
    try {
        if(!id){
            return res.status(404).json({"Error":"id Required"});
        }
        const apiKey = (crypto.randomBytes(4).readUInt32BE() % 1e9).toString().padStart(9, "0");
        db.query('UPDATE admins SET api_key = ($1) WHERE id = ($2)',[apiKey,id]);
        return res.status(200).json({"API_KEY":apiKey});
    } catch (error) {
        console.log("Error in generateAPIKEY in adminActions Controller",error.message);
        return res.status(400).json({"Error":"Failed To generate API Key"});
    }
}

