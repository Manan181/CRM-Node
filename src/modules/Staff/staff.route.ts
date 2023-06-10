import express from 'express';
import StaffController from './staff.controller';

const router = express.Router();

router.post('/create', StaffController.createStaff);
router.get('/staff/:id', StaffController.readStaff);
router.get('/', StaffController.readAllStaff);
router.patch('/update/:id', StaffController.updateStaff);
router.delete('/delete/:id', StaffController.deleteStaff);

export default router;
