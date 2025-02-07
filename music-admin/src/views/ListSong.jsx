import {useEffect, useState} from "react";
import api from "../api/request.js";
import {toast} from "react-toastify";

const ListSong = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        api.get("/song/list-song").then(res => {
            setList(res.data.songs);
        }).catch(e => {

        })
    }, [list]);

    const deleteSong = (id) => {
        api.delete(`/song/remove-song/${id}`).then(res => {
            toast(res.data.message, {
                type: "success"
            })
            setList(pre => pre.filter(v => v.id != id));
        }).catch(res => {
            toast(res.response.data.message, {
                type: "error"
            })
        })
    }


    return (
        <>
            <header className={"w-full p-3 bg-orange-400 border-b mb-5 border-orange-500"}>
                <h1 className={"text-[25px] text-white"}>List Song</h1>
            </header>
            <div className={"p-3 h-[80%]"}>
                <div className={"w-full border text-orange-500 flex items-center justify-between text-center py-3"}>
                    <span className={"w-full"}>Image</span><span className={"w-full"}>Name</span><span
                    className={"w-full"}>Desc</span><span className={"w-full"}>Duration</span>
                </div>
                <div className={"w-full h-[85%] text-orange-500 border border-t-0"}>
                    {
                        list.map((v, i) => (
                            <div key={i}
                                 className={"w-full relative border-b flex w-full py-3 text-orange-500 flex  items-center justify-between text-center"}>
                                <div className={"flex items-center justify-center w-full"}><img
                                    className={"object-fill h-[50px]"}
                                    src={v.image} alt=""/></div>
                                <span className={"w-full"}>{v.name}</span><span
                                className={"w-full"}>{v.desc.slice(0, 12)}</span><span
                                className={"w-full"}>{v.duration}</span>
                                <button onClick={() => deleteSong(v.id)}
                                        className={"cursor-pointer rounded-full border p-2 hover:bg-orange-500 hover:text-white absolute right-[20px] "}>Delete
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ListSong;