const express = require("express");
const router = express.Router();

/* Middleware */
const { hashPassword } = require("./middlewares/hashPassword");
const { verifyToken } = require("./middlewares/jwtMiddleware");

/* Fonction */
const { register, login, getAll } = require("./controllers/UserController");
const { submit, getByUserId, getAll } = require("./controllers/TimerController");

router.get("/", (req, res) => {
  console.log("Serveur opérationnel !");
  res.send("Serveur opérationnel !");
});

/* User Routes */
const userRouter = express.Router();

router.use("/users", userRouter);
userRouter.post("/register", hashPassword, register);
userRouter.post("/login", login);
userRouter.get("/", getAll);

/* Timer Routes */
const timerRouter = express.Router();

router.use("/timer", timerRouter);
timerRouter.use(verifyToken);
timerRouter.get("/", getAll);
timerRouter.get("/:user_id", getByUserId);
timerRouter.post("/:user_id", submit);

module.exports = router;
