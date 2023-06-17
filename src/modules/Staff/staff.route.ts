import express from 'express';
import StaffController from './staff.controller';
import { ValidateJoi } from '../../middleware/validations';
import { validateStaffData, validateStaffLoginData } from './staff.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateStaffData.data), StaffController.createStaff);
router.get('/staff/:id', StaffController.readStaff);
router.get('/', StaffController.readAllStaff);
router.patch('/update/:id', StaffController.updateStaff);
router.delete('/delete/:id', StaffController.deleteStaff);
router.post('/admin/login', ValidateJoi(validateStaffLoginData.data), StaffController.loginAdmin);

export default router;
