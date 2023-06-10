import express from 'express';
import RolesController from './roles.controller';

const router = express.Router();

router.post('/create', RolesController.createRole);
router.get('/role/:id', RolesController.readRole);
router.get('/', RolesController.readAllRoles);
router.patch('/update/:id', RolesController.updateRole);
router.delete('/delete/:id', RolesController.deleteRole);

export default router;
