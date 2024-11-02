import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getUserByEmailAndPassword, getUserById,isUserValid } from "../../controllers/userController"
import { PassportStrategy } from '../../interfaces/index'
import { User } from '../../models/userModel'

const localStrategy = new LocalStrategy({
   usernameField: "email",
   passwordField:"password"
},
(email,password,done)=>{
   const user = getUserByEmailAndPassword(email,password)
   if(!user){
      return done(null, false, { message: `Couldn't find user with email: ${email}` });
   } else if (!isUserValid(user,password)){
      return done(null, false, { message: "Password is incorrect." });
   }
   return done(null,user)
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
