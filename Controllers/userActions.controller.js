import pg from "pg";
import crypto from "crypto";
import db from '../Models/database.js'



export const checkTrainAvailability = async (req,res)=>{
    const {start_station,end_station} = req.body;
    // console.log(req.user);
    try {
        if(!start_station || !end_station){
            return res.status(400).json({"Error" : "All Feilds are Required"});
        }
        const result1 = await db.query("SELECT * FROM trains WHERE start_station = ($1) and end_station = ($2)",[start_station,end_station]);
        return res.status(200).json(result1.rows);
    } catch (error) {
        console.log("Error in checkTrain Avaiability in userActions controller",error.message);
        return res.status(404).json({"Error":error.message});
    }
}

export const checkSeatsAvailability = async (req,res)=>{
    const {trainId} = req.body;
    try {
        if(!trainId){
            return res.status(404).json({"Error" : "All Feilds are Required"});
        }
        const result1 = await db.query("SELECT * FROM trains WHERE id = ($1)",[trainId]);
        if(result1.rows.length === 0){
            return res.status(404).json({"Error":"No Such Train found"});
        }
        return res.status(200).json(result1.rows[0].seats_filled);
    } catch (error) {
        console.log("Error in check seats Avaiability in userActions controller",error.message);
        return res.status(404).json({"Error":error.message});
    }
}

export const bookTickets = async (req,res)=>{
    // console.log("Here");
    const {trainId} = req.body;
    try {
        await db.query('BEGIN');

        if(!trainId){
            await db.query('ROLLBACK');
            return res.status(404).json({"Error":"Train id Required"});
        }

        const result = await db.query('SELECT * FROM trains WHERE id = ($1)',[trainId]);
        if(result.rows.length==0){
            await db.query('ROLLBACK');
            return res.status(404).json({"Error" : "No Such Train Found with Specified Train Id"});
        }

        const train = result.rows[0];
        if(train.seats_available == train.seats_filled){
            await db.query('ROLLBACK');
            return res.status(404).json({"Error"  : "Seats Already Filled"});
        }

        const new_seats_filled = train.seats_filled + 1;
        const start = train.start_station;
        const end = train.end_station;
        const booking_id = (crypto.randomBytes(4).readUInt32BE() % 1e9).toString().padStart(9, "0");

        const result1 = await db.query("INSERT INTO bookings (user_name,user_email,start_station,end_station,booking_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",[req.user.name,req.user.email,start,end,booking_id]);
        const result2 = await db.query("UPDATE trains SET seats_filled = $1 WHERE id = $2",[new_seats_filled,trainId]);

        await db.query('COMMIT');
        return res.status(200).json(result1.rows[0]);
    } catch (error) {
        console.log("Error in book tickets in useractions controller");
        return res.status(404).json({"Error":"Unable to Book Tickets"});
    }
}

export const getBookingDetails = async (req,res)=>{
    const {booking_id} = req.body;
    try {
        if(!booking_id){
            return res.status(404).json({"Error":"Booking id is required"});
        }
        const result = await db.query("SELECT * FROM bookings WHERE booking_id = $1",[booking_id]);
        if( result.rows.length == 0){
            return res.status(404).json({ "Error" : "No Records found for Given booking id"});
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error in getBooking Details in userActions Controller",error.message);
        return res.status(200).json({"Error" : error.message});
    } 
}