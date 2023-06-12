import express from 'express';
import ItemsController from './items.controller';
import { ValidateJoi } from '../../middleware/validations';
import { validateItemData } from './items.validate';

const router = express.Router();

router.post('/create', ValidateJoi(validateItemData.data), ItemsController.createItem);
router.get('/', ItemsController.readAllItems);
router.patch('/update/:id', ItemsController.updateItem);
router.delete('/delete/:id', ItemsController.deleteItem);

export default router;
