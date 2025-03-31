
import { Preferences } from "../models/index.js";
export const setPreference = async (req, res) => {
    try {
        const { username, category } = req.body;
        const userId = req.user.userId; // ✅ Get userId from token

        if (!userId || !username || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUsername = await Preferences.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const preference = await Preferences.create({ userId, username, category });

        res.status(201).json({ message: "Preference saved successfully", preference });

    } catch (error) {
        console.error("Preference error:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};
