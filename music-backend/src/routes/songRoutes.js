import {addSong, listSong, removeSong} from "../controller/SongController.js";

import express from "express"
import upload from "../middleware/multer.js";

const songRouter = express.Router();
//                                  自动捕获字段中，为image和audio的文件
songRouter.post("/add-song", upload.fields([{name: "image", maxCount: 1}, {name: "audio", maxCount: 1}]), addSong);
songRouter.get("/list-song", listSong);
songRouter.delete(`/remove-song/:id`, removeSong);


export default songRouter;