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
  //order에서 사용하는 서비스 로직
  try {
    const user = await User.findOne({ email: email });

    return user._id; // user._id를 통해 ObjectId를 반환
  } catch (err) {
    return null;
  }
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
const changeDbname = async (email, newNickname) => {
  try {
    // 이메일로 사용자를 찾고 nickname을 업데이트합니다.
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // 수정할 사용자를 찾기 위한 조건
      { nickname: newNickname }, // 업데이트할 필드
      { new: true } // 업데이트된 문서를 반환하도록 설정
    );

    if (updatedUser) {
      console.log("Nickname updated successfully:", updatedUser);
      return updatedUser; // 업데이트된 사용자 정보를 반환
    } else {
      console.log("User not found");
      return null; // 사용자가 존재하지 않음
    }
  } catch (error) {
    console.error("Error updating nickname:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserId,
  changeDbname,
};
