import { Router } from "express";
import { addUser, getUserById, getUsers } from "../controllers/user.controller";

const router = Router();

router.route("/").post(addUser)
router.route("/").get(getUsers)
router.route("/:id").get(getUserById)


export default router;