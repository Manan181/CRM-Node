import express from 'express';
import InvoicesController from './invoices.controller';

const router = express.Router();

router.post('/create', InvoicesController.createInvoice);
router.get('/invoice/:id', InvoicesController.readInvoice);
router.get('/', InvoicesController.readAllInvoices);
router.patch('/update/:id', InvoicesController.updateInvoice);
router.delete('/delete/:id', InvoicesController.deleteInvoice);

export default router;
