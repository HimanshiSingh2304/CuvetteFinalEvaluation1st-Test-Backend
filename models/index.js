import userSchema from "./users/index.js"
import eventSchema from "./Events/index.js"
import preferenceSchema from "./Preferences/index.js"
import { model  } from "mongoose"

export const User = model("User", userSchema)
export const Event = model("Event", eventSchema)
export const Preferences = model("Preference", preferenceSchema)