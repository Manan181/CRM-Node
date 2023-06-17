import express from 'express';
import ContactsController from './contacts.controller';
import { ValidateJoi } from '../../../middleware/validations';
import { validateContactsData, validateUpdateContactData, validateContactPassword } from './contacts.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateContactsData.data), ContactsController.createContact);
router.get('/contact/:id', ContactsController.readContact);
router.get('/', ContactsController.readAllContacts);
router.patch('/update/:id', ValidateJoi(validateUpdateContactData.data), ContactsController.updateContact);
router.delete('/delete/:id', ContactsController.deleteContact);
router.post('/set-password', ValidateJoi(validateContactPassword.data), ContactsController.setContactPassword);

export default router;
