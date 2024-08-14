const express = require("express"); // express 모듈 가져옴
const apiController = require("./controller");
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiController); //

app.post("/api/login", (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password; // = const{email, password} = body;
  console.log(email, password);
  return res.json({ message: "login success" });
});
// 이메일과 패스워드가 같이 담겨 있는 body
//DB에 해당 emial, password 조회해서 로그인 여부 판단
// /프리픽스/서픽스

app.listen(8000, () => {
  console.log("Express Running on 8000");
}); //첫번째 인자 : 현재 epress가 구독하고 있는 포트번호

// app.post("/api/signup", (req, res) => {
//     const{email, password, nickname} = req.body;
//     console.log("회원 가입 :", email, password, nickname);
//     return res.json({message : "join success"});
// });
