import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";

const Queue = () => {
    const {queueList,playWithFile} = useContext(PlayerContext);
    console.log(queueList)
    return (
        <div className={"w-[400px] h-[500px] fixed bg-stone-950 bottom-[100px] rounded right-[7px] py-3 px-4"}>
            <h3 className={"mb-5"}>Queue List</h3>
            {queueList?.length ? queueList.map((v) => (
                <div className={"flex justify-between items-center cursor-pointer hover:bg-blue-950 p-3 rounded"} onClick={()=>playWithFile(v)} key={v.id}>
                    <div className={"flex gap-2 items-center"}>
                        <img src={v.image} className={"w-18 rounded"} alt=""/>
                        <div className={"flex flex-col gap-3"}>
                            <span className={"text-[16px]"}>{v.name}</span>
                            <span className={"text-[10px]"}>{v?.albums?.[0]?.name}</span>
                        </div>
                    </div>
                    <span className={"text-[14px] text-slate-500"}>{v.duration}</span>
                </div>
            )) : <span className={"text-[15px] text-slate-200"}>not songs yet</span>}
        </div>
    );
}

export default Queue;