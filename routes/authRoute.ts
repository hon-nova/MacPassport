import express from 'express'
import passport from 'passport'
import { forwardAuthenticated, isAdmin } from '../middleware/checkAuth'
import { User } from "../models/userModel"
import { IVerifyOptions } from "passport-local";

const router = express.Router()

router.get("/login", forwardAuthenticated, (req,res)=>{
   res.render("login")
})
router.post("/login", (req, res, next) => {
   passport.authenticate("local", (err:Error, user:User, info:IVerifyOptions) => {
       if (err) { return next(err); }
       if (!user) { 
         // req.flash("errors", {msg: info.message});
         return res.redirect("/auth/login"); }
       req.logIn(user, (err) => {
           if (err) { return next(err); }
           if(isAdmin(req)){
            return res.redirect('/admin')
           } else {
            return res.redirect("/dashboard");
           }
           
       });
   })(req, res, next);
});

router.get("/github", passport.authenticate("github"))


// router.get("/logout", (req,res)=>{
//    req.logout((err)=>{
//       if(err) {
//           console.log(err)
//       }
//    });
//    res.redirect("/auth/login")
// });
router.get("/logout", (req, res) => {
   req.logout((err) => { 
       if (err) {
           console.log(err); 
           return res.redirect("/auth/login"); 
       }
       res.redirect("/auth/login"); 
   });
});


export default router