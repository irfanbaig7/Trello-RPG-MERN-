import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // no token ?
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, unauthorized" });
    }

    // take token
    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id; // user ID available next
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
}