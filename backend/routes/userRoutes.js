import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateUserByModerator,
} from "../controllers/userController.js";
import { protect, admin, moderator } from "../middleware/authMiddlware.js";

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect,getUsers);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/moderator").get(protect, moderator, getUsers);
router
  .route("/moderator/:id")
  .get(protect, moderator, getUserById)
  .put(protect, moderator, updateUserByModerator);

export default router;
