import express from 'express';
import CustomerController from './customer.controller';

const router = express.Router();

router.post('/create', CustomerController.createCustomer);
router.get('/customer/:id', CustomerController.readCustomer);
router.get('/', CustomerController.readAllCustomer);
router.patch('/update/:id', CustomerController.updateCustomer);
router.delete('/delete/:id', CustomerController.deleteCustomer);

export default router;
