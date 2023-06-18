import Note from './notes.model';
import { Request } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';
import moment from 'moment';

class notesModule {
  private static logger: any = Log.getLogger();

  // create a new note
  public static createNote = async (req: Request) => {
    try {
      const note = new Note({
        customerId: req.body.customerId,
        addedFrom: req.body.addedFrom,
        noteDescription: req.body.noteDescription,
        dateAdded: moment().format('YYYY-MM-DD HH:mm:ss')
      });
      const savedNote = await note.save();
      return sucResponse(200, 'Note Saved!', savedNote);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // get all notes
  public static readAllNotes = async () => {
    try {
      const notes = await Note.find();
      if (notes.length > 0) {
        return sucResponse(200, `${notes.length} Notes Found!`, notes);
      } else {
        return errResponse(404, 'No Notes Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // read a note
  public static readNote = async (req: Request) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findById(noteId);
      if (!note) {
        this.logger.error('Note not found!');
        return errResponse(404, 'Note Not Found!', note);
      } else {
        this.logger.info('Note Found!', note);
        return sucResponse(200, 'Found Note!', note);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // update a note
  public static updateNote = async (req: Request) => {
    try {
      const update = {
        noteDescription: req.body.noteDescription
      };
      const note = await Note.updateOne({ _id: req.params.id }, { $set: update }, { upsert: true });
      if (note) {
        this.logger.info('Note Updated Successfully!');
        return sucResponse(201, 'Updated Note!', note);
      } else {
        this.logger.error('Note Not Found!');
        return errResponse(404, 'Note Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // delete a Note
  public static deleteNote = async (req: Request) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findByIdAndDelete(noteId);
      if (!note) {
        this.logger.error('Note not found!');
        return errResponse(404, 'Note Not Found!', note);
      } else {
        return sucResponse(200, 'Note Deleted!', note);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default notesModule;
