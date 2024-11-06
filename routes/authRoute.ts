import express, {Request, Response} from 'express'
import passport from 'passport'
import { forwardAuthenticated, isAdmin } from '../middleware/checkAuth'
import { User } from "../models/userModel"
import { IVerifyOptions } from "passport-local";
import { getUserByEmailAndPassword } from '../controllers/userController';
import flash from 'connect-flash';


const router = express.Router()
router.use(flash());

router.get("/login", forwardAuthenticated, (req,res)=>{
   let errorMsg= req.flash('error');
   res.render("login",{ messages: errorMsg } )
})
router.post("/login", (req, res, next) => {
   passport.authenticate("local", {failureFlash: true, failureRedirect: "/auth/login"},(err:Error, user:Express.User, info:IVerifyOptions) => {
      if (err) { return next(err); }
         
      if (!user) {          
         req.flash('error', info.message);
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

router.get('/github/callback', 
   passport.authenticate('github',{failureRedirect:"/auth/login"}),

   function(req:Request,res: Response){
      res.redirect('/dashboard')
});

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