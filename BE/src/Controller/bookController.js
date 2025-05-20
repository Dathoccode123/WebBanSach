import expressAsyncHandler from "express-async-handler";
import { BookModel } from "../model/bookModel.js";
export const getAllBook = expressAsyncHandler( async(req,res)=>{
    const books = await BookModel.find({});
    res.send(books);
});

export const findBookById = expressAsyncHandler(async(req, res)=>{
    const book = await BookModel.findById({_id: req.params.id});
    if(book){
        res.send(book);
    }
    else{
        res.send({message:" book not found"});
    }
});


export const filterBookByType = expressAsyncHandler(async (req, res) => {

  
    const filterBookByType = await BookModel.find({
      type: req.params.type,
    }).limit(5);
    res.send(filterBookByType);
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
      return res
        .status(201)
        .send({ message: "New Book Created", data: newBook });
    } else {
      res.send("error add Book");
    }
  });
  
  export const updateBook = expressAsyncHandler( async(req,res)=>{
    const book = await BookModel.findById(req.body._id);
    if(book){
        book.name= req.body.name;
        book.price= req.body.price;
        book.salePrice= req.body.salePrice;
        book.type= req.body.type;
        book.amount= req.body.amount;
    }
    const updateBook = await book.save();
    if(updateBook){
        res.send("update thanh cong");
    }
    else{
        res.send("update that bai");
    }
  });

  export const DeleteBook = expressAsyncHandler(async (req, res) => {
    const deleteBook = await BookModel.findById(req.params.id);

  
    if (deleteBook) {
      await deleteBook.remove();
      res.send({ message: "Book deleted" });
    } else {
      res.send("error in delete");
    }
  });