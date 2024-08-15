const orderController = require("express").Router();
const { saveData } = require("../service/order.service");
const { getUserId } = require("../service/user.service");

orderController.post("/save", async (req, res) => {
  const data = req.body.data;
  console.log("data", data.buyerMail);

  try {
    // const userIdFind = await getUserId("ehdgks0309@gmail.com");
    const userIdFind = await getUserId(data.buyerMail);
    const saveResult = await saveData({ ...data, buyerId: userIdFind });

    //   console.log("이거까지222", saveResult);
    //console.log("제발 플리즈", saveResult);
    res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: saveResult,
    });
  } catch (error) {
    console.log("에러", error);
    res.status(500).json({
      success: false,
      message: "Failed to save data.",
      error: error.message,
    });
  }
});

module.exports = orderController;

// try {
//   const fetchResult = req.body.data;

//   console

//   const userIdFind = await getUserId(fetchResult.buyerEmail);

//   console.log("이거까지", userIdFind);
//   const saveResult = await saveData(fetchResult);
//   console.log("이거까지222", saveResult);

//   if (!saveResult) {
//     return res.status(500).json({ message: "서버 접근 실패" });
//   } else {
//     return res.status(200).json({ message: "서버 접근 성공" });
//   }
// } catch (err) {
//   return res.status(400).json({ message: "잘못된 접근입니다." });
// }
// });
// module.exports = orderController;
