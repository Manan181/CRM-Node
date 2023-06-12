import express from 'express';
import ItemsGroupController from './itemGroups.controller';

const router = express.Router();

router.post('/create', ItemsGroupController.createItemGroup);
router.get('/', ItemsGroupController.readAllItemGroups);
router.patch('/update/:id', ItemsGroupController.updateItemGroup);
router.delete('/delete/:id', ItemsGroupController.deleteItemGroup);

export default router;
