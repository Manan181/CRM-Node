import express from 'express';
import { RolesController } from '../../controllers/Roles/roles.controller';

const router = express.Router();

router.post('/createRole', RolesController.createRole);
router.get('/getRole/:roleId', RolesController.readRole);
router.get('/getRoles', RolesController.readAllRoles);
router.patch('/updateRole/:roleId', RolesController.updateRole);
router.delete('/deleteRole/:roleId', RolesController.deleteRole);

export default router;
