import {userModel} from "../models/userModel";


const getUserByEmailAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};


function isUserValid(user: any, password: string) {
  return user.password === password;
}


export {
  getUserByEmailAndPassword,
  getUserById,
};
