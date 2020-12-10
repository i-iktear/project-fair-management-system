import mongoose from "mongoose";

const numberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    session: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    teammembers: {
      type: Number,
      required: true,
    },
    frontend: {
      type: String,
      required: true,
    },
    backend: {
      type: String,
      required: true,
    },
    database: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },

    numbers: [numberSchema],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
