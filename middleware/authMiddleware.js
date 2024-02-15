const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: missing token" });
    }

    try {
        console.log("Provided Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "Invalid User" });
        }

        req.user = {
            userId: user._id,
        };
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);

        // Log additional information about the token
        console.error("Provided Token:", token);

        // Log decoded information (if available)
        if (error.name === "JsonWebTokenError") {
            console.error("JWT Decoding Error:", error.message);
        }

        next(error);
    }
};

module.exports = authMiddleware;
