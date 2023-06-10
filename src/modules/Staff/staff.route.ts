import express from 'express';
import StaffController from './staff.controller';

const router = express.Router();

router.post('/create', StaffController.createStaff);
router.get('/staff/:staffId', StaffController.readStaff);
router.get('/', StaffController.readAllStaff);
router.patch('/update/:staffId', StaffController.updateStaff);
router.delete('/delete/:staffId', StaffController.deleteStaff);

export default router;
