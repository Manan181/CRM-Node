import express from 'express';
import NotesController from './notes.controller';
import { ValidateJoi } from '../../../middleware/validations';
import { validateNotesData, validateUpdateNoteData } from './notes.validate';
import NotesExportController from './notes.export.controller';
const router = express.Router();

router.post('/create', ValidateJoi(validateNotesData), NotesController.createNote);
router.get('/contact/:id', NotesController.readNote);
router.get('/', NotesController.readAllNotes);
router.patch('/update/:id', ValidateJoi(validateUpdateNoteData), NotesController.updateNote);
router.delete('/delete/:id', NotesController.deleteNote);
router.get('/:customerId/export/:to', NotesExportController.ExportNotes);

export default router;
