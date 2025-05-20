import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Book = new Schema({
    name :{type:String},
    price:{type:Number, required :true},
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    amount:{type:Number},
},
{
    timestamps: true,
  },
)
export const BookModel = mongoose.model("Book", Book)
