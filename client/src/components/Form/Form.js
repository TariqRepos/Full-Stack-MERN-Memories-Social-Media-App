import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); // Fetches posts
    const classes = useStyles();
    const dispatch = useDispatch();

    // Will run when there is a change in ID, which will grab the post assocaited with the id
    useEffect(() => {
        if(post)
            setPostData(post);
    }, [post]);

    // Submit action from form
    const handleSubmit = (e) => {
        // Prevents page refreshing
        e.preventDefault();

        if(currentId) {
            // Will dispatch update post action if current id is specified
            dispatch(updatePost(currentId, postData));
        } else {
            // Will dispatch create post action if current id is not specified
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value})}
                ></TextField>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value})}
                ></TextField>
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value})}
                ></TextField>
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
                ></TextField>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file" 
                        multipe={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    />
                </div>
                <Button 
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>
                        Submit
                </Button>
                <Button 
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth>
                        Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;
