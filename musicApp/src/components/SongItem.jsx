import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";

const SongItem = ({item}) => {
    const {playWithFile} = useContext(PlayerContext);
    return (
        <div onClick={() =>playWithFile(item)} className={"min-w-[180px] max-w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"}>
            <img className={"rounded w-full object-fill "} src={item.image} alt=""/>
            <p className={"font-bold mt-2 mb-1"}>{item.name}</p>
            <p className={"text-slate-200 text-sm"}>{item.desc}</p>
        </div>
    )
}
export default SongItem;