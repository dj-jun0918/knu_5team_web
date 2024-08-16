const mongoose = require("../db_init");
const { String, Number } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: String,
    },
    buyerName: {
      type: String,
    },
    buyerPhone: {
      type: String,
    },
    buyerMail: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    receiverAddress: {
      type: String,
    },
    receiverPhone: {
      type: String,
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
