import {useEffect, useState} from "react";
import api from "../api/request.js";
import {toast} from "react-toastify";
import {assets} from "../assets/assets.js";

const AddSong = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        api.get('/album/list').then(res => {
            setList(res.data.list);
        })
    }, []);
    const [form, setForm] = useState({
        name: "",
        desc: "",
        album: "",
        audio: "",
        image: "",
    })

    const handlerChange = (e) => {
        let {name, value} = e.target;
        if (name === "audio" || name === "image") {
            setForm(prevState => ({...prevState, [name]: e.target.files[0]}))
        } else
            setForm(prevState => ({...prevState, [name]: value}))
    }
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", form.name);
        formData.append("desc", form.desc);
        formData.append("album", form.album);
        formData.append("audio", form.audio);
        formData.append("image", form.image);
        api.post('/song/add-song', formData).then(res => {
            setForm({
                name: "",
                desc: "",
                album: "",
                audio: null,
                image: null,
            });
            toast(res.data.message, {
                type: "success"
            })
            setLoading(false);
        }).catch(e => {
            console.log(e)
            toast(e.response.data.message, {
                type: "error"
            })
            setLoading(false);

        })
    }

    return (
        <>
            <header className={"w-full p-3 bg-orange-400 border-b mb-5 border-orange-500"}>
                <h1 className={"text-[25px] text-white"}>Add Song</h1>
            </header>
            <div className=" p-3 flex  gap-5 gap-3">
                <form onSubmit={(e) => handleSubmit(e)} action="" className={"flex flex-col items-start gap-3"}>
                    <div className={"flex gap-3  justify-between"}>
                        <label htmlFor="song" className={"flex flex-col gap-2"}>
                            <span className={"text-sm"}>Song</span>
                            <input type="file" name={"audio"}
                                   id={"song"} onChange={(e) => handlerChange(e)}
                                   className={"w-[100px] hidden h-[100px] border border-slate-300 py-2 px-3"}/>
                            <div
                                className={"w-[100px] flex items-center justify-center  h-[100px] border border-slate-300 py-2 px-3"}>
                                {
                                    form.audio ? <img src={assets.upload_added} alt=""/> :
                                        <span className={"text-[10px]"}>Choose music</span>
                                }
                            </div>
                        </label>
                        <label htmlFor="image" className={"flex flex-col gap-2"}>
                            <span className={"text-sm"}>Image</span>
                            <input id={"image"} onChange={(e) => handlerChange(e)} type="file"
                                   name="image"
                                   className={"hidden"}/>
                            <div
                                className={"flex items-center justify-center p-2 h-[100px] w-[100px] border border-slate-300"}>
                                {
                                    form.image ?
                                        <img className={"w-full object-fill"} src={URL.createObjectURL(form.image)}
                                             alt=""/> :
                                        <span className={"text-[10px]"}>Choose Image</span>
                                }
                            </div>
                        </label>
                    </div>
                    <div className={"flex flex-col items-center gap-3"}>
                        <label htmlFor="" className={"flex flex-col gap-2"}>
                            <span className={"text-sm"}>name</span>
                            <input type="text" value={form.name} onChange={(e) => handlerChange(e)} name={"name"}
                                   className={"w-[450px] py-2 border border-slate-300 px-3"}
                                   placeholder={"song name"}/>
                        </label>
                        <label htmlFor="" className={"flex flex-col gap-2"}>
                            <span className={"text-sm"}>desc</span>
                            <input type="text" value={form.desc} onChange={(e) => handlerChange(e)} name={"desc"}
                                   className={"w-[450px] py-2 border border-slate-300 px-3"}
                                   placeholder={"song desc"}/>
                        </label>
                        <label htmlFor="" className={"flex flex-col gap-2"}>
                            <span className={"text-sm"}>album</span>
                            <input type="text" onChange={(e) => handlerChange(e)} name={"album"} value={form.album}
                                   className={"w-[450px] py-2 border border-slate-300 bg-slate-300 px-3"}
                                   disabled={true} placeholder={"song's album"}/>

                        </label>
                    </div>
                    <div className={"flex gap-2 text-white"}>
                        <button disabled={loading} type={"button"}
                                className={"cursor-pointer py-2 px-3  bg-orange-500 hover:bg-orange-600"}
                                onClick={() => {
                                    setForm({
                                        name: "",
                                        desc: "",
                                        album: "",
                                        audio: "",
                                        image: "",
                                    })
                                }}>cancel fill
                        </button>
                        <button disabled={loading} className={"cursor-pointer py-2 px-3 bg-blue-500 hover:bg-blue-600"}>{loading?"Loading":"Add"}</button>
                    </div>
                </form>
                <div className={"flex flex-col w-full h-[700px] overflow-hidden"}>
                    <div
                        className={"w-full flex items-center justify-between text-orange-500  border p-2 px-3  text-center"}>
                        <span className={"w-full"}>Image</span><span className={"w-full"}>name</span><span
                        className={"w-full"}>desc</span><span className={"w-full"}>bg-color</span>
                    </div>
                    <div
                        className={"w-full flex flex-col text-orange-500 border-r  border-l border-b py-2 h-full overflow-auto"}>
                        {
                            list.length ? list.map((v, i) => {
                                return <div key={i}
                                            className={"w-full relative  p-2 px-3 border-b   flex items-center justify-between text-center"}>
                                    <button disabled={loading} onClick={() => {
                                        setForm(prevState => ({...prevState, album: v.name}))
                                        toast("choose success", {
                                            type: "success"
                                        });
                                    }}
                                            className={"rounded-full cursor-pointer absolute py-2 px-3 border hover:bg-orange-600 hover:text-white"}>choose
                                    </button>
                                    <div className={"w-full  flex justify-center"}><img className={" w-[50px] h-[50px]"}
                                                                                        src={v.image} alt=""/></div>
                                    <span className={"w-full"}>{v.name}</span>
                                    <span className={"w-full"}>{v.desc.slice(0, 12)}</span>
                                    <span className={"w-full flex justify-center"}>
                                    <div
                                        className={` w-[50px] h-[50px]`} style={{background: `${v.bgColor}`}}></div>
                                </span>
                                </div>
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSong;