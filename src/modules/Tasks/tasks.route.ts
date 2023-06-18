import express from 'express';
import ContactsController from './tasks.controller';
import { ValidateJoi } from '../../middleware/validations';
import { validateTaskData, validateUpdateTaskData } from './tasks.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateTaskData.data), ContactsController.createTask);
router.get('/', ContactsController.readAllTasks);
router.patch('/update/:id', ValidateJoi(validateUpdateTaskData.data), ContactsController.updateTask);
router.delete('/delete/:id', ContactsController.deleteTask);

export default router;
