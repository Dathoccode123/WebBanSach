
import express from 'express'
import { getAllBook, getBooksByType, findBookById, updateBook, DeleteBook,AddBook } from '../Controller/bookController.js'
const BookRouter = express.Router()


BookRouter.get("/", getAllBook);
BookRouter.get("/filter", getBooksByType);
BookRouter.get("/find/:id" , findBookById);
BookRouter.post("/add", AddBook);
BookRouter.put("/update/:id", updateBook);
BookRouter.delete("/delete/:id",DeleteBook);

export default BookRouter;