import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import SearchPanel from '../SearchPannel/SearchPannel';
import MovieCard from '../MovieCard/MovieCard'
import { Link } from "react-router-dom";

import './ShowTicket.css'
function ShowTicket() {
    


    return(
        <>
        <Navbar/>
        <div className="homeContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center'  // Adjust the background position as needed
            }}>

        </div>
        </>
    );
}
export default ShowTicket;