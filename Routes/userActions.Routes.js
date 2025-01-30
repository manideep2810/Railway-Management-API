import express from "express";
import { checkTrainAvailability,checkSeatsAvailability,bookTickets,getBookingDetails } from "../Controllers/userActions.controller.js";
import { protectRoute } from "../Middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post('/checkTrains',protectRoute,checkTrainAvailability);
router.post('/checkSeatsAvailability',protectRoute,checkSeatsAvailability);
router.post('/bookTickets',protectRoute,bookTickets);
router.post('/getBookingDetails',protectRoute,getBookingDetails);

export default router;
