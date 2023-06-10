import express from 'express';
import ContactsController from './contacts.controller';

const router = express.Router();

router.post('/create', ContactsController.createContact);
router.get('/contact/:id', ContactsController.readContact);
router.get('/', ContactsController.readAllContacts);
router.patch('/update/:id', ContactsController.updateContact);
router.delete('/delete/:id', ContactsController.deleteContact);

export default router;
