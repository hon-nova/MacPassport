"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require('dotenv').config();
const passport_github2_1 = require("passport-github2");
// console.log(process.env.GITHUB_CLIENT_ID)
// console.log(process.env.GITHUB_CLIENT_SECRET)
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("Missing GitHub client ID or secret");
}
// const githubStrategy:GitHubStrategy = new GitHubStrategy({
//       clientID:process.env.GITHUB_CLIENT_ID as string,
//       clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
//       callbackURL:"http://localhost:8000/auth/github/callback",
//       passReqToCallback: true,
//       scope: ['user:email']
//    },
//    async(req: Request, accessToken: string, refreshToken: string,profile: User, done: Function)=>{
//       console.log(`accessToken: `,accessToken)
//       console.log(`profile: `,profile)
//       //TODO here...
//   })
const githubStrategy = new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
    scope: ['user:email']
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`accessToken: `, accessToken);
    console.log(`profile: `, profile);
    // TODO here...
}));
const passportGitHubStrategy = {
    name: 'github',
    strategy: githubStrategy
};
exports.default = passportGitHubStrategy;