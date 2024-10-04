import express from 'express';
import { CustomerController } from '../controllers/customerController';

const router = express.Router();

router.get('/', CustomerController.getAll);
router.get('/:id', CustomerController.getById);
router.post('/', CustomerController.create);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

export default router;