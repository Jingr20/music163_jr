import Discover from "@/pages/discover";
import Mine from "@/pages/mine";
import Friend from "@/pages/friend";
import {Redirect} from 'react-router-dom';
import Recommend from '@/pages/discover/child-pages/recommend';
import Ranking from '@/pages/discover/child-pages/ranking';
import Album from '@/pages/discover/child-pages/album';
import Djradio from '@/pages/discover/child-pages/djradio';
import Artist from '@/pages/discover/child-pages/artist';
import Song from '@/pages/discover/child-pages/song';

const routes = [
    {
        path:"/discover",
        component:Discover,
        routes:[
            { path: '/discover', exact:true, render: () => <Redirect to="/discover/recommend"/>},
            { path: '/discover/recommend', component: Recommend },
            { path: '/discover/ranking', component: Ranking },
            { path: '/discover/album', component: Album },
            { path: '/discover/djradio', component: Djradio },
            { path: '/discover/artist', component: Artist },
            { path: '/discover/song', component: Song }
        ]
    },
    {
        path: "/mine",
        component: Mine
    },
    {
        path: "/friend",
        component: Friend
    },
    {
        path: '/', 
        exact: true, 
        render: () => <Redirect to="/discover" /> 
    }
    // {
    //     path:"/",
    //     component:Discover
    // }
]

export default routes;

