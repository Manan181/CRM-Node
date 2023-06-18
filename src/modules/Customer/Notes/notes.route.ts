import express from 'express';
import NotesController from './notes.controller';
import { ValidateJoi } from '../../../middleware/validations';
import { validateNotesData, validateUpdateNoteData } from './notes.validate';
const router = express.Router();

router.post('/create', ValidateJoi(validateNotesData.data), NotesController.createNote);
router.get('/contact/:id', NotesController.readNote);
router.get('/', NotesController.readAllNotes);
router.patch('/update/:id', ValidateJoi(validateUpdateNoteData.data), NotesController.updateNote);
router.delete('/delete/:id', NotesController.deleteNote);

export default router;
