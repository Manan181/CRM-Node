import express from 'express';
import ProposalsController from './proposals.controller';
import { ValidateJoi } from '../../../middleware/validations';
import { validateProposalsData, validateUpdateProposalData } from './proposals.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateProposalsData.data), ProposalsController.createProposal);
router.get('/contact/:id', ProposalsController.readProposal);
router.get('/', ProposalsController.readAllProposals);
router.patch('/update/:id', ValidateJoi(validateUpdateProposalData.data), ProposalsController.updateProposal);
router.delete('/delete/:id', ProposalsController.deleteProposal);

export default router;
