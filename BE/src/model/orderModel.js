import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Order = new Schema({
    orderItems: [{
        name: { type: String, required: true},
        qty: { type: Number, required: true},
        salePrice: { type: Number, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }}],
    paymentMethod: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    status:{type: String},
    totalPrice: { type: Number},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
    timestamps: true,
  },
)
export const OrderModel = mongoose.model('Order', Order);