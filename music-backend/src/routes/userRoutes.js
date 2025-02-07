import express from "express";
import {
    addLove,
    createList,
    getList, getListSong,
    homeSongs,
    removeLove,
    searchSongs,
    signIn,
    signUp
} from "../controller/UserController.js";
import upload from "../middleware/multer.js";


let userRouter = express.Router();

userRouter.post('/sign-up', upload.single("image"), signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/createList/:id', createList);
userRouter.delete('/removeLove/:listId/:songId', removeLove);
userRouter.post('/addLove/:listId/:songId', addLove);

userRouter.get('/list/:id', getList);
userRouter.get('/listSong/:id', getListSong);
userRouter.get('/home', homeSongs);
userRouter.get("/search/:name", searchSongs);

export default userRouter;