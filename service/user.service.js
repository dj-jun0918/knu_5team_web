const User = require("../schema/user.schema");
//user = {emial:"", nickname="", password=""}
const createUser = async (user) => {
  try {
    const createUser = await User.create(user);
    console.log(createUser);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (email, password, nickname) => {
  const user = await User.findOne({});
};

const getUserByEmail = async (email) => {
  //예측할 수 없는 서버단의 오류를 위해 try-catch 설정
  try {
    const user = await User.findOne({ email }); //mongoose에서 찾아오는 함수
    console.log(user);
    return user;
  } catch (err) {
    return null;
  }
<<<<<<< HEAD
};
// const getUserByToken = async () => {
//   try {
//     const token;
//     return true;
//   } catch (err){
//     return null;
//   }
// }
=======
}; //유저 정보를 가져옴


>>>>>>> a3488c4fa17aa2c5a1dc5805625ef4dc29252187
module.exports = {
  createUser,
  getUserByEmail,
  // getUserByToken,
};
