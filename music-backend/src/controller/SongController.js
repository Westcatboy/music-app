import {v2 as cloudinary} from "cloudinary"
import prisma from "../config/prisma.js";

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        // 获取上传的音频文件
        const audioFile = req.files.audio?.[0];
        // 获取上传的图片文件
        const imageFile = req.files.image?.[0];
        if (!name || !desc || !audioFile || !imageFile) {
            return res.status(422).json({success: false, message: "something is empty !"});
        }
        // 存储到云服务上                                                                               上传源文件的类型
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"})
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        // 音频文件自动返回音频时长
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
        // 格式化数据
        const songData = {
            name,
            desc, image: imageUpload.secure_url, file: audioUpload.secure_url, duration,
        };
        if (album) {
            const find_album = await prisma.album.findUnique({
                where: {
                    name: album
                }
            })
            if (!find_album) {
                return res.status(422).json({success: false, message: "data cannot process !"});

            }
            // 添加新歌
            let newSong = await prisma.song.create({
                data: {
                    ...songData,
                    albums: {
                        connect: {id: find_album.id}
                    }
                },
            });
        } else {
            // 添加新歌
            let newSong = await prisma.song.create({
                data: songData,
            });
        }


        // node.js 请求结果返回
        // 添加成功返回消息
        res.json({success: true, message: "Song added"});
    } catch (e) {
        console.log(e)
        res.status(400).json({success: false, message: "something is wrong !"})
    }
}


const listSong = async (req, res) => {
    try {
        const songs = await prisma.song.findMany();
        res.json({
            success: true,
            songs,
            message: "get success !"
        });
    } catch (e) {
        res.status(500).json({success: false, message: "get defeat !"});
    }
}


const removeSong = async (req, res) => {
    try {
        const song = await prisma.song.findFirst({
            where: {
                id: req.params.id * 1
            }
        });
        if (!song) return res.status(404).json({success: true, message: "song is not exists !"});
        await prisma.song.delete({
            where: {
                id: req.params.id * 1
            }
        })
        return res.json({success: true, message: "song was removed"});
    } catch (e) {
        console.log(e)
        return res.json({success: false, message: "something was wrong !"});

    }
}

export {
    addSong, listSong, removeSong
}