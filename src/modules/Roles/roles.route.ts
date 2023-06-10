import express from 'express';
import RolesController from './roles.controller';

const router = express.Router();

router.post('/create', RolesController.createRole);
router.get('/role/:roleId', RolesController.readRole);
router.get('/', RolesController.readAllRoles);
router.patch('/update/:roleId', RolesController.updateRole);
router.delete('/delete/:roleId', RolesController.deleteRole);

export default router;
