const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

router.post("/user",authMiddleware, userController.createUser);
router.get("/user",authMiddleware, userController.getUsers);
router.get("/user/:id",authMiddleware, userController.getOneUser);
router.put("/user",authMiddleware, userController.updateUser);
router.delete("/user/:id",authMiddleware, userController.deleteUser);

module.exports = router;