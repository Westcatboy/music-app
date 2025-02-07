import {v2 as cloudinary} from "cloudinary"
import prisma from "../config/prisma.js";


const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        if (!name || !desc || !bgColor || !imageFile) {
            return res.status(422).json({success: false, message: "something fields is empty !"});
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const album = await prisma.album.findFirst({
            where: {
                name: name,
            }
        })
        if (album?.id) return res.status(422).json({success: false, message: "album already exists"});
        await prisma.album.create({
            data: {
                name, desc, bgColor, image: imageUpload.secure_url
            }
        });
        return res.json({success: true, message: "album was added"})
    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: "something is wrong !"});
    }
}

const listAlbum = async (req, res) => {
    try {
        const list = await prisma.album.findMany();
        return res.json({success: true, list});
    } catch (e) {
        return res.json({success: false});
    }
}

const removeAlbum = async (req, res) => {
    try {
        const album = await prisma.album.findFirst({
            where: {
                id: req.params.id * 1
            }
        });
        if (!album) return res.status(404).json({success: true, message: "album is not exists !"});
        await prisma.album.delete({
            where: {
                id: req.params.id * 1
            }
        });
        return res.json({success: true, message: "album was deleted"});
    } catch (e) {
        return res.status(300).json({success: false, message: "something is wrong !"});
    }
}


const getAlbum = async (req, res) => {
    try {
        const album = await prisma.album.findFirst({
            where: {
                id: req.params.id * 1
            },
            include: {
                songs: true
            }
        });
        return res.json({success: true, album});
    } catch (e) {
        return res.json({success: false});
    }
}

export {
    addAlbum, listAlbum, removeAlbum, getAlbum
}