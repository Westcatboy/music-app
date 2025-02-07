import SideBar from "../components/SideBar.jsx";
import {Outlet} from "react-router-dom";
import { ToastContainer} from "react-toastify";

const BaseLayout = () => {
    return (
        <>
            <ToastContainer></ToastContainer>
            <main className={"h-screen flex"}>
                <SideBar></SideBar>
                <div className={"w-[100%]"}>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default BaseLayout;