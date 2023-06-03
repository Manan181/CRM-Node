import express from 'express';
import controller from '../../controllers/Customer/customer.controller';

const router = express.Router();

router.post('/createCustomer', controller.createCustomer);
router.get('/getCustomer/:customerId', controller.readCustomer);
router.get('/getCustomers', controller.readAllCustomer);
router.patch('/updateCustomer/:customerId', controller.updateCustomer);
router.delete('/deleteCustomer/:customerId', controller.deleteCustomer);

export = router;