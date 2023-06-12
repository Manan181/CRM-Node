import express from 'express';
import RolesController from './roles.controller';
import { ValidateJoi } from '../../middleware/validations';
import { validateRolesSchema } from './roles.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateRolesSchema.data), RolesController.createRole);
router.get('/role/:id', RolesController.readRole);
router.get('/', RolesController.readAllRoles);
router.patch('/update/:id', RolesController.updateRole);
router.delete('/delete/:id', RolesController.deleteRole);

export default router;
