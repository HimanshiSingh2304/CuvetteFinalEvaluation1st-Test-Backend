import express from 'express';
import authRouter from "./Auth/index.js"
import userRouter from "./User/index.js"
import meetingRouter from "./Event/index.js"

const router = express.Router()
router.use("/auth",authRouter)
router.use("/user", userRouter)
router.use("/event",meetingRouter)
export default router