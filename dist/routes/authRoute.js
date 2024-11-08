"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const checkAuth_1 = require("../middleware/checkAuth");
const router = express_1.default.Router();
router.get("/login", checkAuth_1.forwardAuthenticated, (req, res) => {
    const messages = req.session.messages || [];
    req.session.messages = [];
    res.render("login", { messages });
});
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", { failureRedirect: "auth/login", failureMessage: true }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.session.messages = info
                ? [info.message]
                : ["Login failed"];
            return res.redirect("/auth/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if ((0, checkAuth_1.isAdmin)(req)) {
                return res.redirect("/admin");
            }
            else {
                return res.redirect("/dashboard");
            }
        });
    })(req, res, next);
});
router.get("/github", passport_1.default.authenticate("github"));
router.get("/github/callback", passport_1.default.authenticate("github", { failureRedirect: "/auth/login" }), function (req, res) {
    res.redirect("/dashboard");
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
exports.default = router;
