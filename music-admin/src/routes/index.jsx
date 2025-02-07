import {lazy} from "react";
import BaseLayout from "../layout/BaseLayout.jsx";

const AddAlbum = lazy(() => import("../views/AddAlbum.jsx"));
const AddSong = lazy(() => import("../views/AddSong.jsx"));
const ListAlbum = lazy(() => import("../views/ListAlbum.jsx"));
const ListSong = lazy(() => import("../views/ListSong.jsx"));


export const router = [
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {
                path: "/add-album",
                element: <AddAlbum/>
            },
            {
                path: "/add-song",
                element: <AddSong/>
            },
            {
                path: "/list-album",
                element: <ListAlbum/>
            },

            {
                path: "/list-song",
                element: <ListSong/>
            },
        ]
    },
]

