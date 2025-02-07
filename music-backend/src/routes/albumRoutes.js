import express from "express"
import {addAlbum, getAlbum, listAlbum, removeAlbum} from "../controller/AlbumController.js";
import upload from "../middleware/multer.js";

let albumRouter = express.Router();


albumRouter.post("/add", upload.single("image"), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.get("/album/:id", getAlbum);
albumRouter.delete("/remove/:id", removeAlbum);

export default albumRouter;