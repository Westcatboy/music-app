import {assets} from "../assets/assets.js";
import {useContext, useEffect, useState} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";
import Queue from "./Queue.jsx";
import {UserContext} from "../context/UserContext.jsx";
import api from "../router/index.js";

const Player = () => {
    const {
        seekBg,
        seekBar,
        playStatus,
        play,
        pause,
        queue,
        time,
        previous,
        next,
        seekSong,
        mode,
        setMode,
        volume_bar,
        volume_line,
        controlVol,
        toggleVol,
    } = useContext(PlayerContext);
    const {list, user, setList} = useContext(UserContext);
    const [fullScreen, setFullScreen] = useState(false);
    const [showQueue, setShow] = useState(false);
    const [isLove, setIsLove] = useState(false);
    useEffect(() => {
        if (!user) return;
        setIsLove(list[0].songs.find(v => v.id === queue.id));
    }, [queue, list]);

    const toggleLove = () => {
        let has = list[0].songs.find(v => v.id === queue.id);
        let current = list[0];
        if (has) {
            //     remove
            api.delete(`/user/removeLove/${current.id}/${queue.id}`).then(res => {
                setIsLove(false);
                setList([...list.filter(v => v.id !== current.id),res.data.list]);
            }).catch(res => {

            })
        } else {
            //     add
            api.post(`/user/addLove/${current.id}/${queue.id}`).then(res => {
                setIsLove(true);
                console.log([...list.filter(v => v.id !== current.id),res.data.list])

                setList([...list.filter(v => v.id !== current.id),res.data.list]);
            }).catch(res => {

            })
        }
    }


    return (
        <div className={"h-[10%] bg-black flex  justify-between items-center  text-white px-4"}>
            <div className={"hidden lg:flex items-center gap-4  w-[200px] "}>
                <img className={"w-12"} src={queue.image} alt=""/>
                <div className={"flex flex-col"}>
                    <p>{queue.name}</p>
                    <p className={"text-[12px]"}>{queue.desc.slice(0, 12) + "..."}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img onClick={() => previous()} className={"w-4 cursor-pointer"} src={assets.prev_icon} alt=""/>
                    {
                        !playStatus ?
                            <img onClick={() => play()} className={"w-4 cursor-pointer"} src={assets.play_icon} alt=""/>
                            :
                            <img onClick={() => pause()} className={"w-4 cursor-pointer"} src={assets.pause_icon}
                                 alt=""/>
                    }

                    <img onClick={() => next()} className={"w-4 cursor-pointer"} src={assets.next_icon} alt=""/>
                    {
                        mode === "loop" ? <img onClick={() => setMode("shuffle")} className={"w-4 cursor-pointer"}
                                               src={assets.loop_icon} alt=""/> :
                            <img className={"w-4 cursor-pointer"} onClick={() => setMode("loop")}
                                 src={assets.shuffle_icon} alt=""/>}
                </div>
                <div className="flex items-center gap-5">
                    <p>{time.currentTime.minute.toString().padStart(2, "0")}:{time.currentTime.second.toString().padStart(2, "0")}</p>
                    <div ref={seekBg} onClick={(e) => seekSong(e)}
                         className={"w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"}>
                        <hr ref={seekBar}
                            className={"h-1 border-none w-10 bg-indigo-500  rounded-full"}/>
                    </div>
                    <p>{time.totalTime.minute.toString().padStart(2, "0")}:{time.totalTime.second.toString().padStart(2, "0")}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-3 opacity-75">
                <div className={"cursor-pointer"} onClick={() => toggleLove()}>
                    {
                        isLove ? <i className="bi bi-heart-fill text-rose-600"></i> : <i className="bi bi-heart"></i>
                    }
                </div>
                <div className={"relative"}>
                    <img className={"w-4 cursor-pointer"} onClick={() => setShow(prevState => (prevState ^= true))}
                         src={assets.queue_icon} alt=""/>
                    {showQueue ? <Queue/> : ""}
                </div>
                <img className={"w-4 cursor-pointer"} onClick={() => toggleVol()} src={assets.volume_icon} alt=""/>
                <div ref={volume_bar} onClick={(e) => controlVol(e)}
                     className={"w-20 bg-slate-50 h-1  rounded cursor-pointer"}>
                    <hr ref={volume_line} className={"w-10 h-full bg-lime-300 border-none rounded-full"}/>
                </div>
                {
                    fullScreen ? <img onClick={() => {
                            setFullScreen(false);
                            return document.exitFullscreen()
                        }}
                                      className={"w-4 cursor-pointer"}
                                      src={assets.mini_player_icon} alt=""/> :
                        <img onClick={() => {
                            setFullScreen(true);
                            return document.documentElement.requestFullscreen();
                        }}
                             className={"w-4 cursor-pointer"}
                             src={assets.zoom_icon} alt=""/>
                }

            </div>
        </div>
    )
}

export default Player;