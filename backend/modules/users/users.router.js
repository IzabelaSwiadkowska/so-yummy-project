const { Router } = require("express");
const usersController = require("./users.controller");
const {
  userValidationMiddleware,
  userNameValidator,
  userLoginValidator,
} = require("./users.validators");
const { authMiddleware } = require("../auth/auth.middleware");
const multer = require("multer");
const path = require("path");
const { cloudinary } = require("./users.cloudinary");

const usersRouter = Router();

usersRouter.post(
  "/signup",
  userValidationMiddleware,
  usersController.signupHandler
);
usersRouter.post("/login", userLoginValidator, usersController.loginHandler);
usersRouter.post("/logout", authMiddleware, usersController.logoutHandler);
usersRouter.get("/current", authMiddleware, usersController.currentHandler);
usersRouter.get("/verify/:verificationToken", usersController.verifyHandler);
usersRouter.post("/verify", usersController.resendVerificationHandler);
usersRouter.patch(
  "/",
  authMiddleware,
  userNameValidator,
  usersController.updateUserNameHandler
);

usersRouter.post(
  "/upload",
  usersController.upload.single("image"),
  async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path),
        async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Error",
            });
          }
        };
      res.status(200).json({
        message: "Uploaded",
      });
    } catch (error) {
      console.log(error);
      res.send({
        message: error.message,
      });
    }
  }
);

module.exports = {
  usersRouter,
};
