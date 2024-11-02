"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const userController_1 = require("../../controllers/userController");
const localStrategy = new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => {
    const user = (0, userController_1.getUserByEmailAndPassword)(email, password);
    return user ? done(null, user) : done(null, false, { message: "Your login details are not valid. Please try again" });
});
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    let user = (0, userController_1.getUserById)(id);
    if (user) {
        done(null, user);
    }
    else {
        done({ message: "User not found" }, null);
    }
});
const passportLocalStrategy = {
    name: "local",
    strategy: localStrategy
};
exports.default = passportLocalStrategy;
