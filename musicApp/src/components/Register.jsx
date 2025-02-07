import {useState} from "react";
import api from "../router/index.js";
import {eventEmitter} from "../App.jsx";

const Register = ({toggleSign}) => {
    const [form, setForm] = useState({
        image: null,
        username: "",
        email: "",
        password: "",
    });
    const handlerChange = (e) => {
        let {name, value} = e.target;
        if (name === "image") {
            setForm(prevState => ({...prevState, [name]: e.target.files[0]}));
        } else {
            setForm(prevState => ({...prevState, [name]: value}));
        }
    }
    const createUser = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", form.image);
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);
        api.post('/user/sign-up', formData).then(res => {
            eventEmitter.emits("message", {content: res.data.message, type: "success", duration: 3000});
        }).catch(res => {
            eventEmitter.emits("message", {content: res.response.data.message, type: "danger", duration: 3000});
        })
    }

    return (
        <div className={"w-full fixed left-[0px] top-[0px] flex items-center justify-center h-full"}
             style={{background: "rgba(0,0,0,0.27)"}}>
            <div
                className="w-[50%] h-[55%] rounded-2xl backdrop-blur-2xl bg-black/30 py-4 relative px-5 fade overflow-hidden">
                <div className="ball absolute right-[-50px] top-[-60px] bg-indigo-700"></div>
                <div className="ball absolute left-[-50px] bottom-[-60px] bg-indigo-700"></div>
                <div className="ball bg-indigo-800 absolute left-[100px] backdrop-blur-[4px] bottom-[-60px]"
                     style={{width: "100px", height: "100px"}}></div>
                <h1 className={"text-[30px] text-center mb-4"}>Sign Up</h1>
                <form action="" onSubmit={(e) => createUser(e)}
                      className={"flex flex-col zIndex-[99] relative items-center gap-3 justify-center"}>
                    <div className={"flex gap-3"}>
                        <div className={"flex flex-col justify-between gap-3"}>
                            <label className={"flex flex-col gap-2"} htmlFor="">
                                <span>username</span>
                                <input type="text" placeholder={"username"} name={"username"}
                                       onChange={(e) => handlerChange(e)} className={"border p-2 w-[300px]"}/>
                            </label>
                            <label className={"flex flex-col gap-2"} htmlFor="">
                                <span>email</span>
                                <input type="email" placeholder={"email"} name={"email"}
                                       onChange={(e) => handlerChange(e)} className={"border  p-2 w-[300px]"}/>
                            </label>
                            <label className={"flex flex-col gap-2"} htmlFor="">
                                <span>password</span>
                                <input type="password" placeholder={"password"} name={"password"}
                                       onChange={(e) => handlerChange(e)} className={"border p-2 w-[300px]"}/>
                            </label>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <h2>avatar (optional)</h2>
                            <input type="file" id={"photo"} name={"image"} onChange={(e) => handlerChange(e)}
                                   className={"hidden"}/>
                            <label htmlFor={"photo"}
                                   className={"w-[250px] h-[250px] border cursor-pointer flex items-center justify-center"}>
                                {form.image ?
                                    <img className={"w-full object-cover h-full"} src={URL.createObjectURL(form.image)}
                                         alt=""/> :
                                    <span>Choose Photo</span>}


                            </label>
                        </div>
                    </div>
                    <button className={"border mt-5 px-4 py-2 cursor-pointer hover:bg-white hover:text-[#000]"}>Sign Up
                    </button>
                </form>
                <div onClick={() => toggleSign("login")}
                     className={"absolute cursor-pointer right-[20px] bottom-[20px] text-blue-400 underline"}>To sign in
                </div>
            </div>
        </div>
    )
}
export default Register;