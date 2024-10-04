import { Request, Response } from 'express';
import { openDb } from '../db/db';
import { sendResponse } from '../utils/responseHelper';

export class CustomerController {
    static async getAll(req: Request, res: Response) {
        try {
            const db = await openDb();
            const customers = await db.all('SELECT * FROM customers');
            sendResponse(res, true, 'Customers retrieved successfully', customers);
        } catch (error) {
            sendResponse(res, false, 'Error fetching customers', []);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const db = await openDb();
            const customer = await db.get('SELECT * FROM customers WHERE id = ?', [req.params.id]);

            if (customer) {
                sendResponse(res, true, 'Customer retrieved successfully', customer);
            } else {
                sendResponse(res, false, 'Customer not found', []);
            }
        } catch (error) {
            sendResponse(res, false, 'Error fetching customer', []);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { name, email, phone } = req.body;
            if (!name) {
                return sendResponse(res, false, 'Name is required', []);
            }
            const db = await openDb();
            const result = await db.run('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);

            sendResponse(res, true, 'Customer created successfully', { id: result.lastID, name, email, phone });
        } catch (error) {
            sendResponse(res, false, 'Error creating customer', []);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { name, email, phone } = req.body;
            const db = await openDb();
            await db.run('UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, req.params.id]);

            sendResponse(res, true, 'Customer updated successfully', { id: req.params.id, name, email, phone });
        } catch (error) {
            sendResponse(res, false, 'Error updating customer', []);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const db = await openDb();
            await db.run('DELETE FROM customers WHERE id = ?', [req.params.id]);

            sendResponse(res, true, 'Customer deleted successfully', []);
        } catch (error) {
            sendResponse(res, false, 'Error deleting customer', []);
        }
    }
}
