import { getDB } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET;


export async function register(req, res, next) {
try {
const db = getDB();
const { username, password } = req.body;
const hash = await bcrypt.hash(password, 10);
const result = await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
res.status(201).json({ id: result.lastID, username });
} catch (err) { next(err); }
}


export async function login(req, res, next) {
try {
const db = getDB();
const { username, password } = req.body;
const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
if (!user) return res.status(401).json({ message: "Invalid credentials" });
const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ message: "Invalid credentials" });
const token = jwt.sign({ id: user.id, username }, SECRET, { expiresIn: '7d' });
res.json({ token });
} catch (err) { next(err); }
}
