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

const getUserId = async (email) => {
  const user = await User.findOne({ email: email });

  // 사용자가 존재하지 않는 경우 처리
  if (!user) {
    throw new Error("User not found");
  }

  return user._id; // user._id를 통해 ObjectId를 반환
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
}; //유저 정보를 가져옴

module.exports = {
  createUser,
  getUserByEmail,
  getUserId,
};
