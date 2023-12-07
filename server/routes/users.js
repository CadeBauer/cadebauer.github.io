import express from "express";
import { getInfluencer, getBusiness, updateInfluencer, getSearchInfluencers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/influencer/:id", verifyToken, getInfluencer);
router.get("/business/:id", verifyToken, getBusiness);
router.get("/influencers", verifyToken, getSearchInfluencers);

/* UPDATE */
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/influencer/:id", verifyToken, updateInfluencer);

export default router;