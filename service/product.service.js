const Product = require("../schema/product.schema");

const getProductList = async () => {
  //'product' 모델을 통해, mongoDB에서 데이터를 가져와야함.
  try {
    const productList = await Product.find(); //mongoDB에서 다량의 데이터를 가져오는 방법
    return productList;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProduct = async (requestId) => {
  try {
    const productDetail = await Product.findOne({ productId: requestId });
    return productDetail;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getProductList,
  getProduct,
};
