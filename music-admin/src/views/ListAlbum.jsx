import {useEffect, useState} from "react";
import api from "../api/request.js";
import {toast} from "react-toastify";

const ListAlbum = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        api.get('/album/list').then(res => {
            setList(res.data.list);
        })
    }, [list]);

    const deleteAlbum = (id) => {
        api.delete(`/album/remove/${id}`).then(res => {
            toast(res.data.message, {
                type: "success"
            });
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
                <h1 className={"text-[25px] text-white"}>List Album</h1>
            </header>
            <div className={"p-3 w-full"}>
                <div className={"w-full flex items-center justify-around text-orange-500 border py-2  text-center"}>
                    <span>name</span><span>desc</span><span>bg-color</span>
                </div>
                <div className={"w-full flex flex-col text-orange-500 border-r border-b border-l border-b py-2 "}>
                    {
                        list.length ? list.map((v, i) => {
                            return <div key={i}
                                        className={"w-full relative py-3   flex items-center justify-around text-center"}>
                                <span className={"w-full text-center"}>{v.name}</span>
                                <span className={"w-full text-center"}>{v.desc.slice(0, 12)}</span>
                                <span className={"w-full flex items-center justify-center"}>
                                    <div
                                        className={` w-[50px] h-[50px] shadow-lg`} style={{background: `${v.bgColor}`}}></div>
                                </span>
                                <button
                                    onClick={() => deleteAlbum(v.id)}
                                    className={"absolute right-[20px] cursor-pointer p-3 border  hover:text-white duration-300 hover:bg-orange-500 border-orange-600"}>Delete
                                </button>
                            </div>
                        }) : ""
                    }
                </div>
            </div>
        </>
    )
}

export default ListAlbum;