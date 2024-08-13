require('dotenv').config();
console.log(process.env.MONGODB_URL);
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log("mongodb connected"))
    .catch((err)=>{
        console.log("(!)Occured error from connecting mongodb");
        console.log(err);
        process.exit();
    });// express와 mongodb서버를 연결해주는 코드

    module.exports = mongoose; // mongoose라는 파일을 외부에서도 쓸수있게 해줌
    