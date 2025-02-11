import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import authorize  from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "Create a users" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update a user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete a user" });
});

export default userRouter;
