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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middleware/checkAuth");
const userController_1 = require("../controllers/userController");
const path_1 = __importDefault(require("path"));
const sessionsDir = path_1.default.join(__dirname, '../../sessions');
console.log(`sessionDir: `, sessionsDir);
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Welcome HomePage");
});
router.get("/dashboard", checkAuth_1.ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});
router.get("/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User:", req.user);
    try {
        const sessionFiles = yield fs_1.default.promises.readdir(sessionsDir);
        const sessions = [];
        console.log(`seesionFiles: `, sessionFiles);
        let isPriviledgedAdmin = false;
        for (const file of sessionFiles) {
            const filePath = path_1.default.join(sessionsDir, file);
            // console.log(`filePath:  `,filePath)
            const sessionData = yield fs_1.default.promises.readFile(filePath, "utf-8");
            const sessionObj = JSON.parse(sessionData);
            // console.log(`sessionObj parse:  `,sessionObj)
            try {
                let myUser = (0, userController_1.getUserById)(sessionObj.passport.user);
                if (myUser) {
                    isPriviledgedAdmin = true ? myUser.role === 'admin' : false;
                }
            }
            catch (error) {
                console.log(`NOT FOUND Github account id `);
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
        res.render("admin", { sessions, user: req.user });
    }
    catch (error) {
        console.log(`CATCH admin: ${error}`);
    }
}));
router.post("/admin/revoke/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const thisUserId = req.params.userId;
    try {
        const sessionFiles = yield fs_1.default.promises.readdir(sessionsDir);
        for (const file of sessionFiles) {
            const filePath = path_1.default.join(sessionsDir, file);
            // console.log(`filePath: `,filePath)
            const sessionData = JSON.parse(yield fs_1.default.promises.readFile(filePath, "utf-8"));
            console.log(`sessionData: `, sessionData);
            if (sessionData.passport && sessionData.passport.user === parseInt(thisUserId)) {
                console.log(`filePath to be revoked: ${filePath}`);
                yield fs_1.default.promises.unlink(filePath);
                console.log(`Revoked session ${file} for user ${thisUserId}`);
            }
        }
        res.redirect("/admin");
    }
    catch (error) {
        console.error(`Error revoking sessions for user ${thisUserId}:`, error);
        res.status(500).send(`Failed to revoke sessions for the user: ${error}`);
    }
}));
exports.default = router;
