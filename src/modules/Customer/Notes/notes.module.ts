import Note from './notes.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import moment from 'moment';

class notesModule {
  private static logger: any = Log.getLogger();

  // create a new note
  public static createNote = async (req: Request, res: Response) => {
    try {
      const note = new Note({
        customerId: req.body.customerId,
        addedFrom: req.body.addedFrom,
        noteDescription: req.body.noteDescription,
        dateAdded: moment().format('YYYY-MM-DD HH:mm:ss')
      });
      const savedNote = await note.save();
      return sucResponse('Note Saved!', res, savedNote);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // get all notes
  public static readAllNotes = async (res: Response) => {
    try {
      const notes = await Note.find();
      if (notes.length > 0) {
        return sucResponse(`${notes.length} Notes Found!`, res, notes);
      } else {
        return errResponse(404, 'No Notes Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // read a note
  public static readNote = async (req: Request, res: Response) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findById(noteId);
      if (!note) {
        this.logger.error('Note not found!');
        return errResponse(404, 'Note Not Found!', res, note);
      } else {
        this.logger.info('Note Found!', note);
        return sucResponse('Found Note!', res, note);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // update a note
  public static updateNote = async (req: Request, res: Response) => {
    try {
      const update = {
        noteDescription: req.body.noteDescription
      };
      const note = await Note.updateOne({ _id: req.params.id }, { $set: update }, { upsert: true });
      if (note) {
        this.logger.info('Note Updated Successfully!');
        return sucResponse('Updated Note!', res, note);
      } else {
        this.logger.error('Note Not Found!');
        return errResponse(404, 'Note Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // delete a Note
  public static deleteNote = async (req: Request, res: Response) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findByIdAndDelete(noteId);
      if (!note) {
        this.logger.error('Note not found!');
        return errResponse(404, 'Note Not Found!', res, note);
      } else {
        return sucResponse('Note Deleted!', res, note);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default notesModule;
