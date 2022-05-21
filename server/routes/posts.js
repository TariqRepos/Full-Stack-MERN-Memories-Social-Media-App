// This file will contain all the routes relating to posts

import express from "express";

import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);


export default router;