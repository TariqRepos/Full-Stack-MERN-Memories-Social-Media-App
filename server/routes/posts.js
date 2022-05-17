// This file will contain all the routes relating to posts

import express from "express";

import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost)

export default router;