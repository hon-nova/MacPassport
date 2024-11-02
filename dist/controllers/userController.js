"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmailAndPassword = void 0;
const userModel_1 = require("../models/userModel");
const getUserByEmailAndPassword = (email, password) => {
    let user = userModel_1.userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
exports.getUserByEmailAndPassword = getUserByEmailAndPassword;
const getUserById = (id) => {
    let user = userModel_1.userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};
exports.getUserById = getUserById;
function isUserValid(user, password) {
    return user.password === password;
}
