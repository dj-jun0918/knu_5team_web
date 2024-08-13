const express = require('express');
const apiController = require('./controller');
const app = express();
app.use(express.json());
app.use(express.static("public"));//public 밑에 정적 파일을 실행
console.log("donghan");
app.use("/api",apiController);

app.post("/api/login", (req,res) =>{
    const body = req.body; // email.과 비번을 담고 있는 데이터
    const email = body.email;
    const password = body.password;
    const nickname = body.nickname;
    console.log(body);
    console.log(email, password, nickname);
    //DB에 해당 이메일과 비번 조회후 로그인 여부 판단
    return res.json({message:"로그인 성공"});

});

app.listen(8000, ()=>{
    console.log('Express Running on 8000');
});//포트번호, 함수
