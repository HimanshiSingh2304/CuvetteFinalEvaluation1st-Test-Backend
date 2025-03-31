import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { Preferences } from "../models/index.js";
import jwt from "jsonwebtoken";

// SIGNUP FUNCTION
export const signUp = async (req, res) => {
    try {
        const { fname, lname, email, password, confirmPassword } = req.body;

        if (!fname || !lname || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ fname, lname, email: email.toLowerCase(), password: hashPassword });

        // ✅ **Generate JWT Token**
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "Signup successful",
            userId: newUser._id,
            token // **Return the token in the response**
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};


// LOGIN FUNCTION
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find the userId from Preference collection using username
        const preference = await Preferences.findOne({ username });
        if (!preference) {
            return res.status(401).json({ message: "User not found. Please sign up" });
        }

        // Now find the user using userId from Preference
        const user = await User.findById(preference.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found. Please sign up" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            token,
            message: "Login successful",
            userId: user._id,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};