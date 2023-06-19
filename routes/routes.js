const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const auth = require("../middleware/authMiddleware");
const openaiController = require("../controllers/openaiController");

routes.get("/", auth.checkTokenHome, controllers.homePage);

routes.post("/sendPost/:id", auth.checkTokenPage, controllers.postCreate);

routes.get("/posts/create/:id", auth.checkTokenPage, controllers.postDetail);

routes.post("/postDelete/:id", controllers.postDelete);

// Edit&update post

routes.get("/editPost/:id", controllers.getEditModelPage);

routes.post("/updatePost/:id", auth.checkTokenPage, controllers.getUpdatePost);

// Comment

routes.post(
	"/comments/create/:id",
	auth.checkTokenPage,
	controllers.commentCreate
);

routes.post("/comments/delete/:id", controllers.commentDelete);

// Login & Sign Up

routes.get("/signup", controllers.signupGet);

routes.post("/signup", auth.checkTokenPage, controllers.signupPost);

routes.get("/login", controllers.loginGet);

routes.post("/login", controllers.loginPost);

// Logout

routes.get("/logout", controllers.logoutGet);

// OpenAI

routes.post("/openai", openaiController.generateMeta);

//profile & settings & change password

routes.get("/profile/:id", auth.checkTokenPage, controllers.getProfilePage);

routes.post(
	"/changepassword/:id",
	auth.checkTokenPage,
	controllers.changePassword
);

routes.get("/settings/:id", auth.checkTokenHome, controllers.settingsPage);

module.exports = routes;
