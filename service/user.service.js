const User = require("../schema/user.schema");
//user = {emial:"", nickname="", password=""}
const createUser = async (user) => {
    try{
        const createUser = await User.create(user);
        console.log(createUser);
    }catch(err){
        console.log(err);
    }
};

const getUser = async (email, password, nickname) =>{
    const user = await User.findOne({});
};

module.exports = {
    createUser,
};