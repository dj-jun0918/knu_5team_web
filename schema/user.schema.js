const mongoose = require("../db_init");
const { String } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    //기타 등등 삽입 가능 ex 전번, 생년월일
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
