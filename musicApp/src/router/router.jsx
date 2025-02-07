import {lazy} from "react";
import Album from "../view/Album/Album.jsx";
import Search from "../view/search/index.jsx";

const Home = lazy(() => import ("../view/Home/Home.jsx"));
const List = lazy(() => import ("../view/List/List.jsx"));

export const router = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/album/:id",
        element: <Album/>
    },
    {
        path: "/search/:name",
        element: <Search/>
    },
    {
        path: "/list/:id",
        element: <List/>
    },
    {
        path: "*",
        element: <div>Not found . . </div>
    }
]