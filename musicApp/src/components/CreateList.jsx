import {useContext, useState} from "react";
import api from "../router/index.js";
import {UserContext} from "../context/UserContext.jsx";
import {eventEmitter} from "../App.jsx";

const CreateList = ({onClose}) => {
    const [vis, setVis] = useState(true);
    const [form, setForm] = useState({
        title: "",
        desc: "",
    });
    const {user} = useContext(UserContext);
    const handlerChange = (e) => {
        let {value, name} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    }

    const close=()=>{
        setVis(false);
        setTimeout(() => {
            onClose()
        }, 500)
    }

    const createList = (e) => {
        e.preventDefault();
        api.post(`/user/createList/${user.id}`, form).then(res => {
            eventEmitter.emits("message", {content: res.data.message, duration: 3000, type: "success"})
            close()
        }).catch(res => {
            eventEmitter.emits("message", {content: res.response.data.message, duration: 3000, type: "danger"})

        })
    }


    return (
        <div className={"w-full fixed left-[0px] top-[0px] flex items-center justify-center h-full"}
             style={{background: "rgba(0,0,0,0.27)"}}>
            <div
                className={`w-[30%] h-[40%] relative rounded-2xl backdrop-blur-2xl bg-black/30 py-4 px-5 ${vis ? "fade" : "fade-out"}  overflow-hidden`}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-[20px]"}>Create List</h1>
                    <button className={"rounded-full bg-rose-600 px-3 py-2 cursor-pointer"} onClick={() => {
                        close()
                    }}>close
                    </button>
                </div>
                <form action="" onSubmit={(e) => createList(e)} className={"flex flex-col mt-5 gap-3"}>
                    <label htmlFor="" className={"flex flex-col gap-2 justify-center   "}>
                        <span>Title</span>
                        <input type="text" name={"title"} onChange={(e) => {
                            handlerChange(e)
                        }} placeholder={"list title..."}
                               className={"border w-full border-indigo-200 outline-none py-2 px-3"}/>
                    </label>
                    <label htmlFor="" className={"flex flex-col gap-2 justify-center   "}>
                        <span>Desc</span>
                        <input type="text" name={"desc"} onChange={(e) => {
                            handlerChange(e)
                        }} placeholder={"list desc..."}
                               className={"border w-full border-indigo-200 outline-none py-2 px-3"}/>
                    </label>
                    <button className={"mt-3 cursor-pointer py-2 px-3 bg-indigo-600 hover:bg-indigo-700"}>Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateList;