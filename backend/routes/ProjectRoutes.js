import express from "express";
import { protect, moderator, judge } from "../middleware/authMiddlware.js";
const router = express.Router();
import {
  registerProject,
  getProjectsModerator,
  getMyprojects,
  getProjectById,
  deleteProject,
  updateProject,
  updateProjectByModerator,
  listApprovedProjects,
} from "../controllers/projectController.js";

router
  .route("/")
  .post(protect, registerProject)
  .get(protect, moderator, getProjectsModerator);
router.route("/myprojects").get(protect, getMyprojects);
router.route("/approved").get(protect, judge, listApprovedProjects);
router
  .route("/moderator/:id")
  .put(protect, moderator, updateProjectByModerator);

router
  .route("/:id")
  .get(protect, getProjectById)
  .delete(protect, deleteProject)
  .put(protect, updateProject);

export default router;
