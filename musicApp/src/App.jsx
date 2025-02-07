import Player from "./components/Player.jsx";
import {router} from "./router/router.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useContext} from "react";
import {PlayerContext} from "./context/PlayerContext.jsx";
import {MessageContainer} from "./hooks/useMessage.jsx";
import {EventEmitter} from "./utils/EventEmitter.js";

export const eventEmitter = new EventEmitter();
const App = () => {
    const {audioRef, queue, next, muted} = useContext(PlayerContext);

    return (
        <div className={"h-screen bg-black"}>
            <div className="h-[90%] flex">
                <RouterProvider router={createBrowserRouter(router)}/>
            </div>
            <Player/>
            <audio onEnded={() => next()} muted={muted} ref={audioRef} src={queue.file} preload={"auto"}></audio>
            <MessageContainer></MessageContainer>
        </div>
    )
}


export default App;