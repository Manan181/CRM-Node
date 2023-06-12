import express from 'express';
import InvoicesController from './invoices.controller';
import { ValidateJoi } from '../../../middleware/validations';
import { validateCreateInvoice } from './invoices.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateCreateInvoice.data), InvoicesController.createInvoice);
router.get('/invoice/:id', InvoicesController.readInvoice);
router.get('/', InvoicesController.readAllInvoices);
router.patch('/update/:id', InvoicesController.updateInvoice);
router.delete('/delete/:id', InvoicesController.deleteInvoice);

export default router;
