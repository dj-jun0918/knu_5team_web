const userController = require("express").Router();
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../service/user.service");
const jwt = require("jsonwebtoken");
//회원가입 사이트
userController.post("/signin", async (req, res) => {
  //사용자로부터 이메일과 비번 받음
  const email = req.body.email;
  const password = req.body.password;
  //이메일혹은 비번이 둘중하나라도 없으면 false
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "로그인 정보가 올바르지 않습니다." });
  }
  //email을 기준으로 DB에서 유저 데이터를 꺼내와야함
  const User = await getUserByEmail(email);
  //만약 유저정보가없다면
  if (!User) {
    return res
      .status(404)
      .json({ result: false, message: "회원정보가 없습니다." });
  }
  //User가 실제 있는 구간
  const isValidPAssword = bcrypt.compareSync(password, User.password); // 로그인창에 적은 비밀번호와 암호화된 비번 비교 password === User.passsword
  if (isValidPAssword) {
    const token = jwt.sign(
      { email: User.email, nickname: User.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, messsage: "로그인 성공", token }); //token 끼워넣기
  } else {
    return res
      .status(400)
      .json({ result: false, message: "비밀번호가 틀립니다" });
  }
});

userController.post("/", async (req, res) => {
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
