import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {router} from "./routes/index.jsx";

const App = () => {
    return (
        <RouterProvider router={createBrowserRouter(router)}/>
    )
}

export default App;