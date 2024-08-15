const mongoose = require("../db_init");
const { String, Number } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerPhone: {
      type: String,
      required: true,
    },
    buyerMail: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverAddress: {
      type: String,
      required: true,
    },
    receiverPhone: {
      type: String,
      required: true,
    },
    products: {
      type: Array, //[{productId : 1, productTitle : "title"}]
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
