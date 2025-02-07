import {useState} from "react";
import api from "../api/request.js";
import {toast} from "react-toastify";

const AddAlbum = () => {
    const [image, setImage] = useState(null);
    const [imagePre, setImagePre] = useState(null);
    const [loading, setLoading] = useState(false);
    const reader = new FileReader();
    reader.onload = (e) => {
        setImagePre(reader.result);
    };
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        bgColor: "#000000",

    })

    const handlerForm = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const preview = (e) => {
        setImage(null);
        let file = e.target.files[0];
        setImage(file);
        setImagePre(null);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const createAlbum = async (e) => {
        e.preventDefault();
        setLoading(true);
        let form = new FormData();
        form.append("name", formData.name);
        form.append("desc", formData.desc);
        form.append("image", image);
        form.append("bgColor", formData.bgColor);
        api.post(`album/add`, form).then(res => {
            toast(res.data.message, {
                type: "success"
            });
            setLoading(false);
        }).catch(e => {
            toast(e.response.data.message, {
                type: "error"
            });
            setLoading(false);

        })
    }

    return (
        <div>
            <header className={"w-full p-3 bg-orange-400 border-b mb-5 border-orange-500"}>
                <h1 className={"text-[25px] text-white"}>Add Album</h1>
            </header>
            <div className={" pl-3 pt-3"}>
                <form onSubmit={(e) => createAlbum(e)}>
                    <div className="flex items-start justify-start gap-3">
                        <div className={"flex flex-col gap-5 "}>
                            <label htmlFor="" className={"flex flex-col"}>
                                <span className={"mb-2 text-sm"}>Album Name</span>
                                <input value={formData.name} onChange={(e) => handlerForm(e)} name={"name"}
                                       type="text"
                                       className={"w-[500px] rounded border-[#eee] border-[3px] px-3 py-2 outline-none focus:shadow shadow-slate-400 duration-300"}
                                       placeholder={"album name"}/>
                            </label>
                            <label htmlFor="" className={"flex flex-col"}>
                                <span className={"mb-2 text-sm"}>Album Desc</span>
                                <input value={formData.desc} onChange={(e) => handlerForm(e)} name={"desc"}
                                       type="text"
                                       className={"w-[500px] rounded border-[#eee] border-[3px] px-3 py-2 outline-none focus:shadow shadow-slate-400 duration-300"}
                                       placeholder={"album desc"}/>
                            </label>
                            <label htmlFor="" className={"flex flex-col "}>
                                <span className={"mb-2 text-sm"}>Album BgColor</span>
                                <input value={formData.bgColor} type="color"
                                       onChange={(e) => handlerForm(e)} name={"bgColor"}
                                       className={"w-[500px]   h-[45px]  focus:shadow shadow-slate-400 duration-300"}
                                />
                            </label>
                            <button
                                disabled={loading}
                                className={"bg-blue-500 h-[48px] rounded  cursor-pointer font-bold text-[20px] hover:bg-blue-600 duration-300 text-white"}>{
                                loading ? "Loading" : "Create"
                            }
                            </button>
                        </div>
                        <div className={"flex flex-col"}>
                            <h4 className={"mb-2 text-sm"}>album Image</h4>
                            <input value={formData.image} name={"image"} id={"album-photo"} onChange={(e) => {
                                preview(e);
                            }}
                                   type="file" className={"hidden"}/>
                            <label htmlFor={"album-photo"}
                                   className={" border border-[3px] border-[#eee] cursor-pointer flex items-center justify-center h-[300px] w-[300px]"}>
                                {
                                    imagePre ? <img src={imagePre} className={"object-cover"} alt=""/>
                                        : <span className={"text-green-600"}>Select photo to preview</span>
                                }
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAlbum;