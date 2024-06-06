import { Router } from "express";
import { addVoteController } from "../controllers/vote.js";

const voteRouter = Router();

voteRouter.post("/vote", addVoteController);

export default voteRouter;
