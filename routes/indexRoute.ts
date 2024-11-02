import express, { Request, Response } from 'express'
import passport from 'passport'
import { ensureAuthenticated } from '../middleware/checkAuth'
import { getUserByEmailAndPassword, getUserById } from '../controllers/userController'
import { User } from "../models/userModel"
import path from 'path'
const sessionsDir = path.join(__dirname,'../../sessions')
console.log(`sessionDir: `,sessionsDir)
import fs  from 'fs'

const router = express.Router()

router.get("/",(req,res)=>{
   res.send("Welcome HomePage")
})
router.get("/dashboard", ensureAuthenticated, (req,res)=>{
   res.render('dashboard', {user:req.user})
})

router.get("/admin", async(req,res)=>{
   console.log("User:", req.user);
    try {
      const sessionFiles = await fs.promises.readdir(sessionsDir);
      const sessions = [];
       
      let isPriviledgedAdmin = false
      for (const file of sessionFiles) {

         const filePath = path.join(sessionsDir, file);
        
         const sessionData = await fs.promises.readFile(filePath, "utf-8" );         
         const sessionObj = JSON.parse(sessionData);
         
         try {
            let myUser = getUserById(sessionObj.passport.user)
            if(myUser){
            isPriviledgedAdmin = true ? myUser.role === 'admin' : false 
            }
               
         } catch(error){
            console.log(`NOT FOUND Github account id `)
         }          
         if (sessionObj.passport && sessionObj.passport.user) {         
            sessions.push({
            sessionId: file,
            userId: sessionObj.passport.user,
            isPriviledgedAdmin
            });
        }
      }   
      // console.log(`all sessions: `,sessions)
      res.render("admin", {sessions, user: req.user})
 
   } catch(error){
      console.log(`CATCH admin: ${error}`)
   }
})

router.post("/admin/revoke/:userId", async(req,res)=>{   
   const thisUserId= req.params.userId;  
   try {      
      const sessionFiles = await fs.promises.readdir(sessionsDir);        
         for (const file of sessionFiles) {
            const filePath = path.join(sessionsDir, file);
            // console.log(`filePath: `,filePath)
            const sessionData = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
            console.log(`sessionData: `,sessionData)
            
            if (sessionData.passport && sessionData.passport.user === parseInt(thisUserId)) {
               // console.log(`filePath to be revoked: ${filePath}`)
               await fs.promises.unlink(filePath);
               console.log(`Revoked session ${file} for user ${thisUserId}`);    
            }               
         }
      res.redirect("/admin");
   } catch (error) {
      console.error(`Error revoking sessions for user ${thisUserId}:`, error);
      res.status(500).send(`Failed to revoke sessions for the user: ${error}`);
   }
})
export default router