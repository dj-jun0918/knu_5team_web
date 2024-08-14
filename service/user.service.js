//가지고있는 정보 활용
const User = require("../schema/user.schema");
//user = {email : "", nickname: "", password: ""}
const createUser = async (user) => {
  try {
    const createdUser = await User.create(user);
    console.log(createdUser);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (email, password, nickname) => {
  const user = await User.findOne({});
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  } catch (err) {
    return null;
  }
}; //유저 정보를 가져옴

module.exports = {
  createUser,
  getUserByEmail,
};
