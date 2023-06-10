import express from 'express';
import InvoicesController from './invoices.controller';

const router = express.Router();

router.post('/create', InvoicesController.createInvoice);
router.get('/invoice/:customerId', InvoicesController.readInvoice);
router.get('/', InvoicesController.readAllInvoices);
router.patch('/update/:customerId', InvoicesController.updateInvoice);
router.delete('/delete/:customerId', InvoicesController.deleteInvoice);

export default router;
