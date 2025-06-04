import expressAsyncHandler from "express-async-handler";
import { BookModel } from "../model/bookModel.js";
export const getAllBook = expressAsyncHandler(async (req, res) => {
  const books = await BookModel.find({});
  res.send(books);
});

export const findBookById = expressAsyncHandler(async (req, res) => {
  const book = await BookModel.findById({ _id: req.params.id });
  if (book) {
    res.send(book);
  } else {
    res.send({ message: " book not found" });
  }
});


export const AddBook = expressAsyncHandler(async (req, res) => {
  const book = new BookModel({
    name: req.body.name,
    price: req.body.price,
    salePrice: req.body.salePrice,
    amount: req.body.amount,
    type: req.body.type,
  });
  const newBook = await book.save();

  if (newBook) {
    return res.status(201).send({ message: "New Book Created", data: newBook });
  } else {
    res.send("error add Book");
  }
});

export const updateBook = expressAsyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const book = await BookModel.findById(bookId);
  if (book) {
    if (req.body.name !== undefined) book.name = req.body.name;
    if (req.body.price !== undefined) book.price = req.body.price;
    if (req.body.salePrice !== undefined) book.salePrice = req.body.salePrice;
    if (req.body.type !== undefined) book.type = req.body.type;
    if (req.body.amount !== undefined) book.amount = req.body.amount;
    if (req.body.description !== undefined) book.description = req.body.description;
  }
  const updateBook = await book.save();
  if (updateBook) {
    res.send("update thanh cong");
  } else {
    res.send("update that bai");
  }
});

export const DeleteBook = expressAsyncHandler(async (req, res) => {
  const deleteBook = await BookModel.findById(req.params.id);

  if (deleteBook) {
    await deleteBook.deleteOne();
    res.send({ message: "Book deleted" });
  } else {
    res.send("error in delete");
  }
});

// API lọc sách theo type (trả về tất cả sách có type tương ứng)
export const getBooksByType = expressAsyncHandler(async (req, res) => {
  const { type } = req.query;
  if (!type) {
    return res.status(400).send({ message: "Thiếu tham số type" });
  }
  const books = await BookModel.find({ type });
  res.send(books);
});
