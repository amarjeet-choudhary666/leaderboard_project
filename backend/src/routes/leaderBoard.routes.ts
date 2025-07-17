import { Router } from "express";
import { getLeaderboard, getLeaderboardByUserId } from "../controllers/leaderBoard.controller";

const router = Router();

router.route("/").get(getLeaderboard)
router.route("/:userId").get(getLeaderboardByUserId)

export default router;