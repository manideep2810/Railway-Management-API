import express from "express";
import { addTrain,modifyAvailability,generateAPIKEY } from "../Controllers/adminActions.controller.js";
import { adminProtectRoute } from "../Middlewares/protectRoute.middleware.js";


const router = express.Router();

router.post('/addTrain',adminProtectRoute,addTrain);
router.post('/modifyAvailability',adminProtectRoute,modifyAvailability);
router.post('/generateApiKey',adminProtectRoute,generateAPIKEY);

export default router;
