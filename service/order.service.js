const Order = require("../schema/order.schema");
const saveData = async (resultDocument) => {
  try {
    const savedOrder = await Order.create(resultDocument);
    return savedOrder;
  } catch (error) {
    console.error("Error saving order:", error);
    return null;
  }
};
module.exports = {
  saveData,
};
