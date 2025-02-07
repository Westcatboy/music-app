import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const Navbar = () => {
    const navigate = useNavigate();

    const {user, logout} = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleSign = (to) => {
        setShowLogin(to === "login");
        setShowRegister(to === "register");
    }
    return (
        <>
            <div className={"w-full flex  justify-between items-center font-bold "}>
                <div className="flex items-center gap-2">
                    <img onClick={() => {
                        if (window.history.length > 1) {
                            navigate(-1)
                        }
                    }}
                         className={"w-8 bg-black p-2 rounded-2xl  cursor-pointer hover:bg-indigo-600 duration-300"}
                         src={assets.arrow_left} alt=""/>
                    <img onClick={() => navigate(+1)}
                         className={"w-8 bg-black p-2 rounded-2xl  cursor-pointer hover:bg-indigo-600 duration-300"}
                         src={assets.arrow_right} alt=""/>
                </div>
                <div className="flex items-center gap-4">
                    {user ?
                        <>
                            {
                                user.avatar ?
                                    <img className={"w-12 h-12 rounded-full"} src={user.avatar} alt=""/> :
                                    <p className={"bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center"}>{user.name.slice(0, 1)}</p>
                            }</> :
                        <div className={"flex gap-3 text-[14px]"}>
                            <button
                                className={"rounded hover:bg-blue-600 duration-300 bg-blue-500 py-2 px-3 cursor-pointer"}
                                onClick={() => setShowLogin(true)}>Sign In
                            </button>
                            <button
                                className={"rounded hover:bg-orange-500  duration-300 bg-yellow-500 py-2 px-3 cursor-pointer"}
                                onClick={() => setShowRegister(true)}>Sign
                                Up
                            </button>
                            {showLogin ? <Login toggleSign={toggleSign}></Login> : ""}
                            {showRegister ?
                                <Register toggleSign={toggleSign}></Register>
                                : ""}
                        </div>}
                </div>
            </div>

        </>
    )
}

export default Navbar;