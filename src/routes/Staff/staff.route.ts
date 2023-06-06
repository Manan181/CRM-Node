import express from 'express';
import { StaffController } from '../../controllers/Staff/staff.controller';

const router = express.Router();

router.post('/createStaff', StaffController.createStaff);
router.get('/getStaff/:staffId', StaffController.readStaff);
router.get('/getStaffs', StaffController.readAllStaff);
router.patch('/updateStaff/:staffId', StaffController.updateStaff);
router.delete('/deleteStaff/:staffId', StaffController.deleteStaff);

export default router;
