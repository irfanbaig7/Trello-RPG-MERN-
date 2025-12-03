import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        // Hash password
        const passHash = await bcrypt.hash(password, 10);

        // create User
        const user = await User.create({
            name,
            email,
            passHash,
        })

        // gen final res
        res.json({
            message: "user registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: "register/Server error" });
    }

}


// login controller

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // user exist
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email" })

        }

        // password match
        const isPassMatch = await bcrypt.compare(password, existingUser.passHash);
        if (!isPassMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // gen Token
        const genToken = generateToken(existingUser._id);

        // response
        return res.status(200).json({
            message: "Login successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
            token: genToken,
        })

    } catch (error) {
        console.error("Login Error , ", error)
        res.status(500).json({
            message: "Login/Server Error"
        })
    }
}

