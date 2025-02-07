import Navbar from "../../components/Navbar.jsx";
import {albumsData, songsData} from "../../assets/assets.js";
import AlbumItem from "../../components/AlbumItem.jsx";
import SongItem from "../../components/SongItem.jsx";
import SideBar from "../../components/SideBar.jsx";
import {useEffect, useState} from "react";
import api from "../../router/index.js";

const Home = () => {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        api.get("/album/list").then(res => {
            setAlbums(res.data.list);
        }).catch(e => {
        })
    }, []);

    useEffect(() => {
        api.get("/user/home").then(res => {
            setSongs(res.data.songs);
        })
    }, []);


    return (
        <>
            <SideBar></SideBar>
            <div className={`w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0`}>
                <Navbar></Navbar>
                <div className=" mb-4">
                    <h1 className={"my-5 font-bold text-2xl"}>Feature Charts</h1>
                    <div className="flex overflow-auto hidden-scroll">
                        {albums.map(({id, name, desc, image}) => (
                            <AlbumItem desc={desc} id={id} name={name} image={image} key={id}></AlbumItem>
                        ))}
                    </div>
                </div>
                <div className=" mb-4">
                    <h1 className={"my-5 font-bold text-2xl"}>Today's biggest hits</h1>
                    <div className="flex overflow-auto hidden-scroll">
                        {songs.map((item,i) => (
                            <SongItem item={item} key={i}></SongItem>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;