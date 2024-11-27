const jwt = require("jsonwebtoken");

// Middleware untuk otentikasi
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.userId = decoded.id;
        req.role = decoded.role; // Menyimpan role di req
        next();
    });
}

// Middleware untuk otorisasi (Admin Only)
function verifyAdmin(req, res, next) {
    if (req.role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    next();
}

module.exports = { verifyToken, verifyAdmin };