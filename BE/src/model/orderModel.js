import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Order = new Schema({
    items : [
          {
            bookId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Book",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
              default: 1,
            },
          },
        ],
    paymentMethod:{type: String},
    status:{type: String},
    totalPrice: { type: Number},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
    timestamps: true,
  },
)
export const OrderModel = mongoose.model('Order', Order);