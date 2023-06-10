import express from 'express';
import ContactsController from './contacts.controller';

const router = express.Router();

router.post('/create', ContactsController.createContact);
router.get('/contact/:contactId', ContactsController.readContact);
router.get('/', ContactsController.readAllContacts);
router.patch('/update/:contactId', ContactsController.updateContact);
router.delete('/delete/:contactId', ContactsController.deleteContact);

export default router;
