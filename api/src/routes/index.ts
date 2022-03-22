import express from "express";
const router = express.Router();

import oauth from "./oauth";

router.get("/oauth-redirect", oauth);

export default router;
