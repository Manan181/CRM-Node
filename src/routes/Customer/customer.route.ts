import express from 'express';
import { CustomerController } from '../../controllers/Customer/customer.controller';

const router = express.Router();

router.post('/createCustomer', CustomerController.createCustomer);
router.get('/getCustomer/:customerId', CustomerController.readCustomer);
router.get('/getCustomers', CustomerController.readAllCustomer);
router.patch('/updateCustomer/:customerId', CustomerController.updateCustomer);
router.delete('/deleteCustomer/:customerId', CustomerController.deleteCustomer);

export default router;
