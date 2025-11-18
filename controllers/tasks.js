import { getDB } from "../db/db.js";
import { serializeTask } from "../models/task.js";


export async function listTasks(req, res, next) {
try {
const db = getDB();
const rows = await db.all("SELECT * FROM tasks WHERE user_id = ?", [req.user.id]);
res.json(rows.map(serializeTask));
} catch (err) { next(err); }
}


export async function getTask(req, res, next) {
try {
const db = getDB();
const row = await db.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
if (!row) return res.status(404).json({ message: "Task not found" });
res.json(serializeTask(row));
} catch (err) { next(err); }
}


export async function createTask(req, res, next) {
try {
const db = getDB();
const { title, description, priority, due_date, tags } = req.body;
const tagsStr = tags ? tags.join(',') : null;
const result = await db.run(
`INSERT INTO tasks (title, description, priority, due_date, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
[title, description, priority, due_date, tagsStr, req.user.id]
);
const row = await db.get("SELECT * FROM tasks WHERE id = ?", [result.lastID]);
res.status(201).json(serializeTask(row));
} catch (err) { next(err); }
}


export async function updateTask(req, res, next) {
try {
const db = getDB();
const { title, description, done, priority, due_date, tags } = req.body;
const tagsStr = tags ? tags.join(',') : null;
await db.run(`UPDATE tasks SET title=?, description=?, done=?, priority=?, due_date=?, tags=? WHERE id=? AND user_id=?`,
[title, description, done ? 1 : 0, priority, due_date, tagsStr, req.params.id, req.user.id]);
const row = await db.get("SELECT * FROM tasks WHERE id=?", [req.params.id]);
res.json(serializeTask(row));
} catch (err) { next(err); }
}


export async function deleteTask(req, res, next) {
try {
const db = getDB();
await db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
res.json({ message: "Task deleted" });
} catch (err) { next(err); }
}
