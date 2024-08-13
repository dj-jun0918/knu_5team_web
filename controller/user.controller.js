const userController = require("express").Router();
const bcrypt = require("bcryptjs");
const { createUser } = require("../service/user.service");

userController.post("/", async (req, res) => {
   const {email, password, nickname} = req.body; // const email = req.body.email;
   
   //1. 이메일 검증
   if(!email.includes("@")){
    return res.status(400).json({isError: true, message: "잘못된 email 입니다."});
   }

   //2. 패스워드 검증
   const passwordRegex =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
   if(!passwordRegex.test(password)){
    return res.status(400).json({isError: true, message: "잘못된 password 입니다."});
   }

   if(nickname.length<2){
    return res.status(400).json({isError: true, message: "잘못된 nickname 입니다."});
   }

   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(password, salt);

   const user = {
    email: email, //email, 키값과 네임이 같으면 이런식으로 줄여쓸수있음
    nickname: nickname,
    password: hashedPassword
   };

   try{
    await createUser(user);
    return res.status(201).json({result:true});
   }catch(err){
    return res.status(500).json({result:false});
   }
   
});

module.exports = userController;