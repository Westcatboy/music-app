import Navbar from "../../components/Navbar.jsx";
import {useParams} from "react-router-dom";
import {albumsData, assets, songsData} from "../../assets/assets.js";
import {useContext, useEffect, useRef, useState} from "react";
import {PlayerContext} from "../../context/PlayerContext.jsx";
import SideBar from "../../components/SideBar.jsx";
import api from "../../router/index.js";
import {delta} from "../../../utils/delta.js";

const Album = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const {playWithFile} = useContext(PlayerContext);
    const albumItem = useRef();
    const [album, setAlbum] = useState(null);
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        api.get(`/album/album/${id}`).then(res => {
            setAlbum(res.data.album);
            setLoading(false);
        })
    }, [id]);
    useEffect(() => {
        if (!album) return;
        albumItem.current.style.background = `linear-gradient(${album.bgColor},#121212)`;
    }, [album]);
    return (
        <>
            <SideBar></SideBar>
            <div ref={albumItem}
                 className={`w-[100%] m-2 px-6 pt-4 rounded bg-black text-white overflow-auto lg:w-[75%] lg:ml-0`}>
                <Navbar></Navbar>
                {
                    loading ? <div>Loading...</div> : <>
                        <div className={"mt-10 flex gap-8 flex-col md:flex-row md:items-end"}>
                            <img className={"w-48 rounded"} src={album.image} alt=""/>
                            <div className={"flex flex-col"}>
                                <p>PlayList</p>
                                <h2 className={"text-5xl font-bold mb-4 md:text-7xl"}>{album.name}</h2>
                                <h4 className={""}>{album.desc}</h4>
                                <p className={"mt-1"}>
                                    <img className={"inline-block w-5"} src={assets.spotify_logo} alt=""/>
                                    <b>Spotify</b>
                                    · 12,123,123 likes
                                    · <b>50 songs,</b>
                                    about 2 hr 30 min
                                </p>
                            </div>
                        </div>
                        <div className={"grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]"}>
                            <p><b className={"mr-4"}>#</b>Title</p>
                            <p>Album</p>
                            <p className={"hidden sm:block"}>Date Added </p>
                            <p>
                                <img className={"m-auto w-4"} src={assets.clock_icon} alt=""/>
                            </p>
                        </div>
                        <hr/>
                        {
                            album?.songs?.map((item, index) => (
                                <div key={index}
                                     onClick={() => playWithFile(item,album)}
                                     className={"grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"}>
                                    <p className={'text-white'}>
                                        <b className={"mr-4 text-[#a7a7a7]"}>{index + 1}</b>
                                        <img className={"inline w-10 mr-5"} src={item.image} alt=""/>
                                        {item.name}
                                    </p>
                                    <p className={'text-white'}>
                                        <b className={"mr-4 text-[#a7a7a7] text-[15px]"}>{album.name}</b>
                                    </p>
                                    <p className={'text-white hidden sm:block'}>
                                        <b className={"mr-4 text-[#a7a7a7]  text-[15px]"}>{delta(item.created_at)}</b>
                                    </p>
                                    <p className={"text-[15px] text-center "}>{item.duration}</p>
                                </div>
                            ))
                        }
                    </>
                }

            </div>

        </>
    )
}


export default Album;