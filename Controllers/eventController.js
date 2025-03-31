import { Event } from "../models/index.js"

export const createEvent = async (req, res) => {
    try {
        const { eventTopic, password, hostName, description, dateAndTime, duration } = req.body;
        const userId = req.user?.userId; // Get user ID from authMiddleware

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        if (!eventTopic || !hostName || !dateAndTime) {
            return res.status(400).json({ message: "Event topic, host name, and date/time are required" });
        }

        const newEvent = await Event.create({
            userId,
            eventTopic,
            password,
            hostName,
            description,
            dateAndTime,
            duration
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: newEvent
        });

    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};
