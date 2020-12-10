import Session from "../models/sessionModel.js";
import asyncHandler from "express-async-handler";

// @desc Create a session
// @route create /api/sessions
// @access private/Moderator
const createdSession = asyncHandler(async (req, res) => {
  const session = new Session({
    name: "Demo session",
    user: req.user._id,
  });
  const createdSession = await session.save();
  res.status(201).json(createdSession);
});

// @desc fetch all sessions
// @route GET /api/sessions
// @access private/Moderator
const getSessions = asyncHandler(async (req, res) => {
  const session = await Session.find();
  res.json(session);
});

// @desc fetch single session
// @route GET /api/sessions/:id
// @access private/moderator
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (session) {
    res.json(session);
  } else {
    throw new Error("Session not Found");
  }
});

// @desc Delete a session
// @route DELETE /api/sessions/:id
// @access private/Moderator
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (session) {
    await session.remove();
    res.json({ message: "Session Removed" });
  } else {
    throw new Error("Session not Found");
  }
});

// @desc Update a session
// @route PUT /api/sessions/:id
// @access private/Moderator
const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    session.name = req.body.name || session.name;
    session.isAvailable = req.body.isAvailable;
    session.user = req.user._id;

    const updatedSession = await session.save();

    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error("Session not Found");
  }
});

// @desc fetch active session
// @route GET /api/sessions/active
// @access public
const getActiveSessions = asyncHandler(async (req, res) => {
  const session = await Session.findOne({ isAvailable: true }).limit(1);
  if (session) {
    res.status(201).json(session);
  }
});

export {
  getSessions,
  getSessionById,
  deleteSession,
  createdSession,
  updateSession,
  getActiveSessions,
};
