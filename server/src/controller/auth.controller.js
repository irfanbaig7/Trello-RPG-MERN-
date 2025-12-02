import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"

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
        res.status(500).json({ message: "Server error" });
    }

}


