import { openDb } from '../db/db';

export class Customer {
    static async createTable() {
        const db = await openDb();
        await db.exec(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT
        )`);
    }
}