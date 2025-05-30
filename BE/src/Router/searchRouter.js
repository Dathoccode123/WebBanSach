import express from "express";
import {searchUser, searchBook,searchOrder} from "../Controller/searchController.js";
const SearchRouter = express.Router();

SearchRouter.get("/user",searchUser);
SearchRouter.get("/book",searchBook);
SearchRouter.get("/order",searchOrder);

export default SearchRouter;