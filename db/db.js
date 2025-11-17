import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;
export async function initDB() {
  db = await open({ filename: "./db/database.db", driver: sqlite3.Database });

  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`);

  await db.exec(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    done INTEGER DEFAULT 0,
    priority INTEGER DEFAULT 2,
    due_date TEXT,
    tags TEXT,
    user_id INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );`);

Return db;
} 

Export función getDB(){
 if (!db) throw new Error("DB no inicializada");