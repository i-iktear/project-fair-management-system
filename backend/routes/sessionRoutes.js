import express from "express";
import { protect, moderator } from "../middleware/authMiddlware.js";
const router = express.Router();
import {
  getSessions,
  getSessionById,
  deleteSession,
  createdSession,
  updateSession,
  getActiveSessions,
} from "../controllers/sessionController.js";

router.route("/active").get(getActiveSessions);

router
  .route("/")
  .get(protect, moderator, getSessions)
  .post(protect, moderator, createdSession);

router
  .route("/:id")
  .get(getSessionById)
  .delete(protect, moderator, deleteSession)
  .put(protect, moderator, updateSession);



export default router;
