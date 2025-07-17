import { Router } from "express";
import { claimPoints, getClaimHistory } from "../controllers/claim.controller";


const router = Router();

router.route("/:userId").post(claimPoints)
router.route("/history").get(getClaimHistory)


export default router;