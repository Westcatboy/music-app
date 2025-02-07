import {createContext, useEffect, useRef, useState} from "react";
import {songsData} from "../assets/assets.js";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volume_bar = useRef();
    const volume_line = useRef();
    const [mode, setMode] = useState("loop");
    const [vol, setVol] = useState(0);
    const [queueList, setQueueList] = useState([songsData[2]]);
    const [queue, setQueue] = useState(songsData[2]);
    const [playStatus, setPlayStatus] = useState(false);
    const [muted, setMuted] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });


    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithFile = async (item, album = null) => {
        await setQueue(item);
        await audioRef.current.play();
        setPlayStatus(true);
        if (album) {
            setQueueList(album.songs);
        } else {
            let s = queueList.find(i => i.id === item.id);
            if (!s)
                setQueueList(prevState => [...prevState, item]);
        }
    }

    const previous = async () => {
        let itemIndex = queueList.findIndex(v => v.id === queue.id);
        if (itemIndex > 0) {
            await setQueue(queueList[itemIndex - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
        if (itemIndex === 0) {
            await setQueue(queueList[queueList.length - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }
    const next = async () => {
        let itemIndex = queueList.findIndex(v => v.id === queue.id);
        if (mode === "loop") {
            if (itemIndex < queueList.length - 1) {
                await setQueue(queueList[itemIndex + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
            if (itemIndex === queueList.length - 1) {
                await setQueue(queueList[0]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        } else {
            let randIndex = Math.floor(Math.random() * queueList.length);
            while (randIndex === itemIndex && queueList.length > 1) {
                randIndex = Math.floor(Math.random() * queueList.length);
            }
            let rand = queueList[randIndex];
            await setQueue(rand);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const toggleVol = () => {
        setMuted(prevState => (prevState ^= true));
        if (!muted) {
            volume_line.current.style.width = 0;
        } else {
            console.log(vol)
            volume_line.current.style.width = ((vol / volume_bar.current.offsetWidth) * 100) + "%";
        }
    }

    const seekSong = async (e) => {
        const clickTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration
        audioRef.current.currentTime = clickTime;
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
    }

    useEffect(() => {
        let a = setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60) || 0,
                            minute: Math.floor(audioRef.current.duration / 60) || 0
                        }
                    }
                )
            }
        }, 1000);
        return () => {
            clearTimeout(a);
        }

    }, [audioRef]);

    const controlVol = (e) => {
        let offsetX = e.nativeEvent.offsetX;
        volume_line.current.style.width = ((offsetX / volume_bar.current.offsetWidth) * 100) + "%";
        const volumeWidth = volume_bar.current.offsetWidth; // 音量条的宽度
        audioRef.current.volume = Math.min(Math.max(offsetX / volumeWidth, 0), 1);  // 计算音量比例
        setVol(offsetX);
    }

    useEffect(() => {
        volume_line.current.style.width = "100%";
        const volumeWidth = volume_bar.current.offsetWidth; // 音量条的宽度
        audioRef.current.volume = 1;  // 计算音量比例
        setVol(volumeWidth);
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        queue,
        setQueue,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        toggleVol,
        muted,
        play,
        pause,
        volume_bar,
        volume_line,
        playWithFile,
        previous, next,
        seekSong,
        mode,
        setMode,
        controlVol,
        queueList
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;