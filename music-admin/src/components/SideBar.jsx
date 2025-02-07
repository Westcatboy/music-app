import {Link, useLocation} from "react-router-dom";
import {assets} from "../assets/assets.js";

const SideBar = () => {
    let location = useLocation();
    return (
        <aside className={"pl-3 pt-3 h-full w-[15%] hidden border-r border-orange-300 lg:flex  flex-col"}>
            <h1 className={"font-bold mb-5 text-[20px] text-orange-400"}>Admin Controller</h1>
            <ul className={"flex flex-col list-style-none"}>
                <Link
                    className={`mb-1 p-3 ${location.pathname === "/add-album" ? "active" : ""} rounded-l duration-300 hover:bg-slate-200 text-[20px] text-orange-400 font-lighter text-end`}
                    to={"/add-album"}>
                    <span className={"text-[15px]"}>Add Album</span>
                </Link>
                <Link
                    className={`mb-1 p-3 text-[15px] ${location.pathname === "/list-album" ? "active" : ""}  text-[20px] rounded-l duration-300 hover:bg-slate-200 text-orange-400 font-lighter text-end`}
                    to={"/list-album"}><span className={"text-[15px]"}>List Album</span></Link>
                <Link
                    className={`mb-1 p-3 text-[15px] ${location.pathname === "/add-song" ? "active" : ""}  text-[20px] rounded-l  duration-300 hover:bg-slate-200 text-orange-400 font-lighter text-end`}
                    to={"/add-song"}><span className={"text-[15px]"}>Add Song</span></Link>
                <Link
                    className={`mb-1 p-3  text-[15px] ${location.pathname === "/list-song" ? "active" : ""}  text-[20px] rounded-l duration-300 hover:bg-slate-200 text-orange-400 font-lighter text-end`}
                    to={"/list-song"}><span className={"text-[15px]"}>List Song</span></Link>
            </ul>
        </aside>
    )
}

export default SideBar;