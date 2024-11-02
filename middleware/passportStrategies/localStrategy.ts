import passport from 'passport'
import { Strategy as LocalStrategy, VerifyFunction, VerifyFunctionWithRequest } from 'passport-local'
import { getUserByEmailAndPassword, getUserById } from "../../controllers/userController"
import { PassportStrategy } from '../../interfaces/index'
import { User } from '../../models/userModel'

const localStrategy = new LocalStrategy({
   usernameField: "email",
   passwordField:"password"
},
(email,password,done)=>{
   const user = getUserByEmailAndPassword(email,password)
   return user ? done(null,user): done(null,false,{message: "Your login details are not valid. Please try again"})
}
)
passport.serializeUser(function (user:any,done:Function){
   done(null,user.id)
})

passport.deserializeUser(function(id:number|string,done:Function){
   let user = getUserById(id)
   if (user){
      done(null,user)
   } else {
      done({message: "User not found"},null)
   }
});
const passportLocalStrategy: PassportStrategy = {
   name:"local",
   strategy: localStrategy
}
export default passportLocalStrategy
