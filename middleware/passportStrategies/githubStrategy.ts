import 'dotenv/config'
require('dotenv').config()
import {Strategy as GitHubStrategy}  from 'passport-github2'

import { PassportStrategy } from '../../interfaces/index'
import { User } from '../../models/userModel'

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
const githubStrategy: GitHubStrategy = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/github/callback",
  passReqToCallback: true,
  scope: ['user:email']
},
async(req: Request, accessToken: string, refreshToken: string, profile: User, done: Function): Promise<void> => {
  console.log(`accessToken: `, accessToken);
  console.log(`profile: `, profile);

  // TODO here...
});

const passportGitHubStrategy: PassportStrategy = {
   name:'github',
   strategy: githubStrategy
};
export default passportGitHubStrategy;