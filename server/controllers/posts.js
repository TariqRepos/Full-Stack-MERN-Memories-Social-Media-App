// This file will contain all the logic for routes relating to posts

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        // Access to db takes time, so needs to be defined as an async action
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post  = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};