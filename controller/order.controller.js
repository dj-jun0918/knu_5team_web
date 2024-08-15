const { saveData } = require("../service/order.service");
const getUserId = require("../service/user.service");

const orderController = require("express").Router();

orderController.post("/save", async (req, res) => {
  try {
    let fetchResult = req.body.data;
    const userIdFind = await getUserId(fetchResult.buyerEmail);
    console.log(userIdFind);
    fetchResult.userId(userIdFind);
    try {
      await saveData(fetchResult);
    } catch (err) {
      return res.status(500).json({ message: "서버 접근 실패" });
    }
  } catch (err) {
    return res.status(400).json({ message: "잘못된 접근입니다." });
  }
});
module.exports = orderController;
