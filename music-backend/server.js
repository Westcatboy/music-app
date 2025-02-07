import express from "express";
import cors from "cors";
import "dotenv/config.js"
import songRouter from "./src/routes/songRoutes.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoutes.js";
import userRouter from "./src/routes/userRoutes.js";


// app config
// 初始化服务器
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

//middlewares
// 服务器中间件，每次请求需要做的事情
app.use(express.json());
app.use(cors());
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/user", userRouter)

//initializing routes

app.get("/", (req, res) => {
    res.send("API working");
})


app.listen(port, () => {
    console.log("server running")
})

