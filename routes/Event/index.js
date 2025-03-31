import express from 'express'
import { createEvent } from '../../Controllers/eventController.js'
import { authMiddleware } from '../../Middleware/authmiddleware.js'

const router = express.Router()
router.post("/create", authMiddleware , createEvent)


export default router