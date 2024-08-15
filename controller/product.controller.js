const { getProductList, getProduct } = require("../service/product.service");

const productController = require("express").Router();

//상품조회 api
//1. 전체를 전부 뽑아주기
//2. 필터(조건)를 적용해 뽑아주기
//3. 페이지네이션 적용

productController.get("/", async (req, res) => {
  //상품 전체 조회
  // 가져온 데이터를 res.json({})에 실어서 클라이언트로 보내준다.
  try {
    const productList = await getProductList();
    return res.json({ result: true, data: productList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ result: false });
  }
});
///////////////////
productController.post("/oneProduct", async (req, res) => {
  try {
    const oneProductId = req.body.productId;
    if (!oneProductId) {
      return res.json({
        result: false,
        data: null,
        message: "(!)productId가 유효하지 않습니다.",
      });
    }
    const oneProduct = await getProduct(oneProductId);
    return res.json({ result: true, data: oneProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ result: false });
  }
});
module.exports = productController;
