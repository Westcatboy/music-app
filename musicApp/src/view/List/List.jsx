import SideBar from "../../components/SideBar.jsx";
import Navbar from "../../components/Navbar.jsx";
import {assets} from "../../assets/assets.js";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import {useParams} from "react-router-dom";
import {PlayerContext} from "../../context/PlayerContext.jsx";
import {delta} from "../../../utils/delta.js";
import api from "../../router/index.js";

const List = () => {
    const {list} = useContext(UserContext);
    let {id} = useParams();
    const {user} = useContext(UserContext);
    const [currentList, setCurrentList] = useState(null);
    const [loading, setLoading] = useState(true);
    const {playWithFile} = useContext(PlayerContext);
    useEffect(() => {
        if (!user) return;
        api.get(`/user/list/${user.id}`).then(res => {
            setCurrentList(res.data.list.find(v => v.id == id))
            setLoading(false);
        }).catch(res => {
            setLoading(false);
        })
    }, [id, list, user]);
    return (
        <>
            <SideBar></SideBar>
            <div className={`w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0`}>
                <Navbar></Navbar>
                <div className={"mt-10 flex gap-8 flex-col md:flex-row md:items-end"}>
                    <img className={"w-48 rounded"} src={currentList?.songs?.[0]?.image || ""} alt=""/>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-5xl font-bold mb-4 md:text-7xl"}>{currentList?.title}</h2>
                        <h4 className={""}>{currentList?.desc}</h4>
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
                {
                    loading ? <div>Loading....</div> : <>{
                        currentList?.songs?.map((item, index) => (
                            <div key={index}
                                 onClick={() => playWithFile(item, currentList)}
                                 className={"grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"}>
                                <p className={'text-white'}>
                                    <b className={"mr-4 text-[#a7a7a7]"}>{index + 1}</b>
                                    <img className={"inline w-10 mr-5"} src={item.image} alt=""/>
                                    {item.name}
                                </p>
                                <p className={'text-white'}>
                                    <b className={"mr-4 text-[#a7a7a7] text-[15px]"}>{currentList.title}</b>
                                </p>
                                <p className={'text-white hidden sm:block'}>
                                    <b className={"mr-4 text-[#a7a7a7]  text-[15px]"}>{delta(item.created_at)}</b>
                                </p>
                                <p className={"text-[15px] text-center "}>{item.duration}</p>
                            </div>
                        ))
                    }</>
                }

            </div>

        </>
    )
}

export default List;