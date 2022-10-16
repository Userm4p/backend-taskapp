import express from 'express';
import { editNoteController } from '../controllers/editNoteController';
import { getAllController } from '../controllers/getAllNotesController';
import { newNoteController } from '../controllers/newNoteController';
import { editNote } from '../middlewares/editNote.middleware';
import { getAllNotesMiddleware } from '../middlewares/getAllNotes.middleware';
import { newNoteMiddleware } from '../middlewares/newNote.middleware';

const app = express();

app.get(
	"/all",
	function (req, res, next) {
		getAllNotesMiddleware(req, res, next)
	}
	, getAllController
)

app.post(
	"/new",
	function (req, res, next) {
		newNoteMiddleware(req, res, next)
	}
	, newNoteController
)
app.put(
	"/edit",
	function (req, res, next) {
		editNote(req, res, next)
	}
	, editNoteController
)

export default app;