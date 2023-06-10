import express from 'express';
import CustomerController from './customer.controller';

const router = express.Router();

router.post('/create', CustomerController.createCustomer);
router.get('/customer/:customerId', CustomerController.readCustomer);
router.get('/', CustomerController.readAllCustomer);
router.patch('/update/:customerId', CustomerController.updateCustomer);
router.delete('/delete/:customerId', CustomerController.deleteCustomer);

export default router;
