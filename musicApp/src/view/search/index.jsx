import SideBar from "../../components/SideBar.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar.jsx";
import {assets} from "../../assets/assets.js";
import api from "../../router/index.js";
import {delta} from "../../../utils/delta.js";
import {PlayerContext} from "../../context/PlayerContext.jsx";

const Search = () => {
    const {name} = useParams();
    const [music, setMusic] = useState([]);
    const {playWithFile} = useContext(PlayerContext);
    useEffect(() => {
        api.get(`/user/search/${name}`).then(res => {
            console.log(res)
            setMusic(res.data.music)
        }).catch(res => {
            console.log(res)
        })
    }, [name]);

    return (
        <>
            <SideBar></SideBar>
            <div className={`w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0`}>
                <Navbar></Navbar>
                <h1 className={"font-bold mt-5 text-[23px]"}>Search for Music</h1>
                <div className="my-3">
                    <div
                        className="grid mb-5 grid-cols-3 border-b p-3 sm:grid-cols-4 text-[#a7a7a7] items-center justify-between">
                        <p className={"flex"}>
                            <span>Title</span>
                        </p>
                        <p className={"flex"}>Album</p>
                        <p className={"flex"}>Date Added</p>
                        <p className={"flex"}>
                            <img className={"m-auto w-4"} src={assets.clock_icon} alt=""/>
                        </p>
                    </div>
                    {music.length ? music.map((v) => (
                        <div onClick={() => playWithFile(v)}
                             className={"grid grid-cols-3 sm:grid-cols-4 py-2 hover:bg-zinc-600 p-3 cursor-pointer"}
                             key={v.id}>
                            <p className={"flex"}>
                                <span>{v.name}</span>
                            </p>
                            <p>
                                {v.albums[0].name}
                            </p>
                            <p>
                                {delta(v.created_at)}
                            </p>
                            <p className={"text-center"}>
                                {v.duration}
                            </p>
                        </div>
                    )) : <div className={"flex items-center justify-center"}>
                        not found...
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Search;