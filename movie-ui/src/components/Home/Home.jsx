
import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import SearchPanel from '../SearchPannel/SearchPannel';
// import { Banner } from "../Banner/Banner";
// import { MovieCard } from "../MovieCard/MovieCard";
// import { SearchPanel } from "../SearchPanel/SearchPanel";
import { Link } from "react-router-dom";

import './Home.css'
export function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        // fetch("url", cb);

        fetch("http://localhost:4000/api/movie")
            .then((res) => res.json())
            .then(movies => {
                // ? ThreadPool, MainThread ?
                setMovies(movies);
            }).catch(err => { })
    }, [])

    return (
        <>
            <Navbar />
            <div className="homeContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center'  // Adjust the background position as needed
            }}>

                <div className="banner">
                    <h1 className="header1">
                        GET <span className="header2">MOVIE</span> TICKETS</h1>
                    <p>
                        Buy movie tickets in advance, find movie times watch trailers,
                    </p>
                    <p>
                        read movie reviews and much more
                    </p>
                </div>
                <SearchPanel/>
            </div>
        </>


    );
}
export default Home
