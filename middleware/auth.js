import jwt from "jsonwebtoken";


export function authenticate(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ message: "No token provided" });


const [, token] = auth.split(' ');
try {
req.user = jwt.verify(token, process.env.JWT_SECRET);
next();
} catch {
res.status(401).json({ message: "Invalid token" });
}
}
