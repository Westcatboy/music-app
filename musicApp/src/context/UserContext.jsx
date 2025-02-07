import {createContext, useEffect, useState} from "react";
import api from "../router/index.js";

export const UserContext = createContext();


const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [list, setList] = useState([]);
    const updateUser = (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    }

    useEffect(() => {
        const loadUser = JSON.parse(localStorage.getItem("user") || "null");
        if (loadUser) {
            setUser(loadUser);
            api.get(`/user/list/${loadUser.id}`).then(res => {
                setList(res.data.list)
            })
        }

    }, []);
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }
    const provider = {user, logout, updateUser,list,setList};
    return <UserContext.Provider value={provider}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;