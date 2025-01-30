import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import users_router from './Routes/user.Routes.js';
import admin_router from './Routes/admin.Routes.js';
import adminActions_router from './Routes/adminActions.Routes.js';
import bookings_router from './Routes/userActions.Routes.js';


const app = express();
const port = process.env.port;

app.use(cookieParser());
app.use(express.json());
app.use('/api/users',users_router);
app.use('/api/admins',admin_router);
app.use('/api/trains',adminActions_router);
app.use('/api/bookings',bookings_router);


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})