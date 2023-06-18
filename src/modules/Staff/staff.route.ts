import express from 'express';
import StaffController from './staff.controller';
import { ValidateJoi } from '../../middleware/validations';
import { validateStaffData, validateStaffLoginData } from './staff.validate';
import { StaffMiddleware } from './staff.middleware';
const router = express.Router();

const staffMiddleware = new StaffMiddleware();

router.post('/create', ValidateJoi(validateStaffData.data), StaffController.createStaff);
router.get('/staff/:id', StaffController.readStaff);
router.get('/', StaffController.readAllStaff);
router.patch('/update/:id', StaffController.updateStaff);
router.delete('/delete/:id', StaffController.deleteStaff);
router.post('/admin/login', ValidateJoi(validateStaffLoginData.data), staffMiddleware.checkCredentials, StaffController.loginAdmin);

export default router;
