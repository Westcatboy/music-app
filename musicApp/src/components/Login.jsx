import {useContext, useState} from "react";
import api from "../router/index.js";
import {eventEmitter} from "../App.jsx";
import {UserContext} from "../context/UserContext.jsx";

const Login = ({toggleSign}) => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const {updateUser} = useContext(UserContext);
    const login = (e) => {
        e.preventDefault();
        api.post("/user/sign-in", form).then(res => {
            eventEmitter.emits("message", {type: "success", content: res.data.message, duration: 3000});
            console.log(res.data.user)
            updateUser(res.data.user)
        }).catch(res => {
            eventEmitter.emits("message", {type: "danger", content: res.response.data.message, duration: 3000});
        });
    }

    const handlerChange = (e) => {
        let {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    return (
        <div className={"w-full fixed left-[0px] top-[0px] flex items-center justify-center h-full"}
             style={{background: "rgba(0,0,0,0.27)"}}>
            <div
                className="w-[30%] h-[40%] relative rounded-2xl backdrop-blur-2xl bg-black/30 py-4 px-5 fade  overflow-hidden">
                <div className="ball absolute right-[-100px] top-[-60px] bg-indigo-700"></div>
                <div className="ball absolute left-[-100px]  backdrop-blur-[4px] bottom-[-60px] bg-indigo-700"></div>
                <div className="ball bg-indigo-800 absolute left-[30px] backdrop-blur-[4px] bottom-[-60px]"
                     style={{width: "100px", height: "100px"}}></div>
                <h1 className={"text-[30px] text-center mb-4"}>Sign In</h1>
                <form action="" onSubmit={(e) => login(e)}
                      className={"flex flex-col zIndex-[99] relative items-center gap-3 justify-center"}>
                    <div className={"flex gap-3"}>
                        <div className={"flex flex-col justify-between gap-3"}>
                            <label className={"flex flex-col gap-2"} htmlFor="">
                                <span>email</span>
                                <input type="email" placeholder={"email"} onChange={(e) => handlerChange(e)}
                                       name={"email"} className={"border  p-2 w-[300px]"}/>
                            </label>
                            <label className={"flex flex-col gap-2"} htmlFor="">
                                <span>password</span>
                                <input type="password" placeholder={"password"} className={"border p-2 w-[300px]"}
                                       name={"password"} onChange={(e) => handlerChange(e)}/>
                            </label>
                        </div>
                    </div>
                    <div className={"flex gap-3 mt-5"}>
                        <button
                            className={"border w-[300px] px-4 py-2 cursor-pointer hover:bg-white hover:text-[#000]"}>Sign
                            Up
                        </button>
                    </div>
                </form>
                <div onClick={() => toggleSign("register")}
                     className={"cursor-pointer absolute right-[20px] bottom-[20px] text-blue-400 underline"}>To sign up
                </div>

            </div>
        </div>
    )
}

export default Login;