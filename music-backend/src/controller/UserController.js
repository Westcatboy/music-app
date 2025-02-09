import prisma from "../config/prisma.js";
import {v2 as cloudinary} from "cloudinary"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

function generateToken(payload, secretKey, options = {}) {
    // payload: 包含用户信息或其他数据
    // secretKey: 用于签名的密钥
    // options: 可选配置（如过期时间）
    return jwt.sign(payload, secretKey, options);
}

const signUp = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        let image = req.file;
        if (!username || !email || !password) {
            return res.status(422).json({success: false, message: "something is empty !"})
        }
        let findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (findUser) {
            return res.status(422).json({success: false, message: "this email is exists !"})
        }
        let imageUrl = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                avatar: imageUrl.secure_url,
                password: hashPassword,
            }
        });
        await prisma.list.create({
            data: {
                title: "My favorite",
                desc: "my favorite songs",
                user_id: newUser.id
            }
        })
        return res.status(200).json({success: true, message: "register success !"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}


const signIn = async (req, res) => {
    try {
        let {email, password} = req.body;
        if (!email || !password) {
            return res.status(422).json({success: false, message: "something is empty !"})
        }
        let findUser = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                lists: true
            },
        });
        if (!findUser) {
            return res.status(422).json({success: false, message: "this email are not exists !"})
        }
        console.log(findUser)
        let compare = await bcrypt.compare(password, findUser.password);
        if (!compare) {
            return res.status(422).json({success: false, message: "User credentials incorrect !"})
        }
        return res.status(200).json({success: true, user: findUser, message: "login success !"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}


const createList = async (req, res) => {
    try {
        let id = req.params.id * 1;
        let {title, desc} = req.body;
        let user = await prisma.user.findFirst({
            where: {
                id
            }
        })
        if (!user || !title || !desc) {
            return res.status(422).json({success: false, message: "User credentials incorrect !"})
        }
        await prisma.list.create({
            data: {
                title,
                desc,
                user_id: id
            }
        });
        return res.json({success: true, message: "create success !"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})

    }
}

const getList = async (req, res) => {
    try {
        let id = req.params.id * 1;
        let list = await prisma.list.findMany({
            where: {
                id
            },
            include: {
                songs: true
            }
        })
        return res.json({success: true, message: "create success !", list})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}
const getListSong = async (req, res) => {
    try {
        let id = req.params.id * 1;
        let list = await prisma.list.findFirst({
            where: {
                id
            },
            include: {
                songs: true
            }
        })
        return res.json({success: true, message: "create success !", list})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}
const removeLove = async (req, res) => {
    try {
        let listId = req.params.listId * 1;
        let songId = req.params.songId * 1;
        let list = await prisma.list.update({
            where: {id: listId},
            data: {
                songs: {
                    disconnect: {id: songId},
                },
            },
            include: {
                songs: true
            }
        });
        return res.json({success: true, message: "remove success !", list})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}

const addLove = async (req, res) => {
    try {
        let listId = req.params.listId * 1;
        let songId = req.params.songId * 1;
        let list = await prisma.list.update({
            where: {id: listId},
            data: {
                songs: {
                    connect: {id: songId},
                },
            },
            include: {
                songs: true
            }
        });
        return res.json({success: true, message: "add success !", list})
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: "something is wrong !"})
    }
}

const homeSongs = async (req, res) => {
    try {
        let songs = await prisma.song.findMany({
            take: 6,
            orderBy: {
                id: 'desc' // 按照id降序排列
            },
            include: {
                albums: true
            }
        });
        return res.json({success: true, songs})
    } catch (e) {
        return res.status(400).json({success: false})

    }
}


const searchSongs = async (req, res) => {
    try {
        let params = req.params.name;
        if (!params) {
            return res.status(422).json({success: false})
        }

        let music = await prisma.song.findMany({
            where: {
                name: {
                    contains: req.params.name,
                }
            },
            include: {
                albums: true
            }
        });
        if (!music.length) {
            return res.status(404).json({success: false})
        }
        return res.json({success: true, music})
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false})
    }
}

export {
    homeSongs, searchSongs, signUp, signIn, createList, getList,
    removeLove, addLove, getListSong
}