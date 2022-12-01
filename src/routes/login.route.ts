import express, { Express, Request, Response } from "express";
const router = express.Router();

router.get("/login", function (req, res) {
  res.send("Need username/email and password");
});

export default router;
