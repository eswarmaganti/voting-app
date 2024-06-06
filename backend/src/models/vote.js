import { Schema, model } from "mongoose";

const voteSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    vote: {
      type: String,
      required: true,
      default: "nota",
    },
  },
  {
    timestamps: true,
  }
);

const Vote = model("Vote",voteSchema);

export default Vote;
