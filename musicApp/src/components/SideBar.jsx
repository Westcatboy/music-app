import {assets} from "../assets/assets.js"
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useState} from "react";
import userContext, {UserContext} from "../context/UserContext.jsx";
import {eventEmitter} from "../App.jsx";
import CreateList from "./CreateList.jsx";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [search, setSearch] = useState("");
    const {user, list} = useContext(UserContext);
    const [showCreate, setShowCreate] = useState(false);
    const searchSongs = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    }

    const createList = () => {
        if (!user) {
            eventEmitter.emits("message", {content: "You are not login yet", duration: 3000, type: "warning"})
        } else {
            setShowCreate(true);
        }
    }

    return (
        <div className={"w-[25%] h-full p-2  flex-col gap-2 text-white hidden lg:flex"}>
            <div className="bg-[#121212] h-[20%] box-border rounded flex flex-col justify-around p-3 gap-2">
                <div onClick={() => navigate("/")}
                     className={`flex items-center gap-3 pl-8 cursor-pointer duration-300 rounded hover:bg-indigo-600  py-3 ${pathname === "/" ? "bg-indigo-600" : ""}`}>
                    <img className={"w-6"} src={assets.home_icon} alt=""/>
                    <span className={"font-bold"}>Home</span>
                </div>
                <form onSubmit={(e) => searchSongs(e)}
                      className="flex items-center gap-3 pl-8 cursor-pointer duration-300 rounded   py-3 ">
                    <img className={"w-6"} src={assets.search_icon} alt=""/>
                    <input
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className={"font-bold outline-none border box-border border-white-600 rounded  px-3 py-2 w-full"}
                        placeholder={"Search music"}/>
                </form>
            </div>
            <div className={"bg-[#121212] h-[85%] rounded "}>
                <div className={"p-4 flex items-center  justify-between"}>
                    <div className="flex items-center gap-3">
                        <img src={assets.stack_icon} className={"w-8"} alt=""/>
                        <span className={"font-bold"}>My Playlist</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className={"w-5 cursor-pointer"} onClick={() => createList()} src={assets.plus_icon} alt=""/>
                    </div>
                </div>
                {
                    list.length ? list.map((v) => (
                            <div key={v.id}>
                                <div onClick={() => navigate(`/list/${v.id}`)}
                                     className="p-4 cursor-pointer bg-[#242424] m-2 font-bold flex flex-col rounded items-start justify-start">
                                    <h1>{v.title}</h1>
                                    <p className={"font-light"}>{v.desc}</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className="p-4 bg-[#242424] m-2 font-bold flex flex-col rounded items-start justify-start">
                            <h1>Create your first playlist</h1>
                            <p className={"font-light"}>It's easy we will help you.</p>
                            <button
                                onClick={() => createList()}
                                className={"px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer hover:bg-black hover:text-white transition duration-300"}>Create
                                PlayList
                            </button>
                        </div>
                }
            </div>
            {
                showCreate ? <CreateList onClose={() => setShowCreate(false)}></CreateList> : ""
            }
        </div>
    )
}

export default SideBar;