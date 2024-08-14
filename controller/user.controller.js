const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../service/user.service");
const userController = require("express").Router();

const jwt = require("jsonwebtoken");

userController.post("/signin", async (req, res) => {
  const body = req.body;
  //사용자로부터 eamil과 password 받기
  const email = body.email;
  const password = body.password;
  //email 혹은 password 둘 중 하나라도 없으면 나가리
  //console.log(email);
  //console.log(password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "로그인 정보가 올바르지 않습니다." });
  }
  //email을 기준으로 db에서 유저 데이터 꺼내와야 함
  const user = await getUserByEmail(email);
  //console.log(user);
  if (!user) {
    return res
      .status(404)
      .json({ result: false, message: "회원 정보가 없습니다." });
  }
  //user가 실제 있는 구간
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (isValidPassword) {
    const token = jwt.sign(
      { email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, message: "로그인 성공", token });
  } else {
    return res
      .status(400)
      .json({ result: false, message: "비밀번호가 올바르지 않습니다." });
  }
});

userController.post("/", async (req, res) => {
  const { email, password, nickname } = req.body;
  console.log(req.body);

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 email 입니다." });
  }
  // 2) password 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  // 3) nickname 검증
  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 닉네임 형식입니다." });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email,
    nickname,
    password: hashedPassword,
  };
  try {
    await createUser(user);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

module.exports = userController;
