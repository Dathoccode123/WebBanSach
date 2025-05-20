
import express from 'express'
import { getAllBook, filterBookByType , findBookById, updateBook, DeleteBook,AddBook } from '../Controller/bookController.js'
const BookRouter = express.Router()


BookRouter.get("/", getAllBook);
BookRouter.get("/filter",filterBookByType);
BookRouter.get("/find/:id" , findBookById);
BookRouter.post("/add", AddBook);
BookRouter.post("/update", updateBook);
BookRouter.delete("/delete",DeleteBook);

export default BookRouter;