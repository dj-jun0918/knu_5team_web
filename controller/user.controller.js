const userController = require("express").Router();
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../service/user.service");
const jwt = require("jsonwebtoken");
userController.post("/signin", async (req, res) => {
  const body = req.body;
  // 사용자로부터 email과 password를 받음
  const email = body.email;
  const password = body.password;
  // email, 혹은 password 둘 중에 하나라도 없으면 ? 나가게 하기
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "(!)로그인 정보가 올바르지 않습니다." });
  }
  // email을 기준으로 DB에서, 유저 데이터를 꺼내와야 함.
  const user = await getUserByEmail(email); //이메일을 꺼내오는 함수 생성
  // User | null
  // 만약 유저 정보가 없다면 나가라,
  if (!user) {
    return res
      .status(400)
      .json({ result: false, message: "(!)회원정보가 없습니다." });
  }
  // User가 실제로 있는 구간
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (isValidPassword) {
    // 실제 토큰을 끼어넣기
    const token = jwt.sign(
      { email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, message: "로그인 성공", token });
  } else {
    res.status(400).json({ result: false, message: "로그인 실패" });
  }
});

userController.post("/", async (req, res) => {
  //회원 가입 api 요청
  const { email, password, nickname } = req.body; // const email = req.body.email;

  //1. 이메일 검증
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 email 입니다." });
  }

  //2. 패스워드 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 password 입니다." });
  }

  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 nickname 입니다." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email: email, //email, 키값과 네임이 같으면 이런식으로 줄여쓸수있음
    nickname: nickname,
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
