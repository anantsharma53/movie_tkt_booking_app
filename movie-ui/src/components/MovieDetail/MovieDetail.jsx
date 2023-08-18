import Navbar from '../Navbar/Navbar';
import { MovieHeader } from "../MovieHeader/MovieHeader";
import "./MovieDetail.css";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export function MovieDetail(){

    const [movie, setMovie] = useState([]);

// 1. capture movie id.
    const {id} = useParams();
    console.log(id)
// 2. call api to get movie details.
    // useEffect(()=>{
    //     fetch(`http://127.0.0.1:8000/api/movie/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setMovie(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching genres:", error);
    //         });        
    // },[id])
    useEffect(() => {

        const getProduct = () => {
            //setLoading(true);
            fetch(`http://127.0.0.1:8000/api/movie/${id}`)
                .then(res => res.json())
                .then(json => {
                    setMovie(json);
                    //console.log(json);
                    //setLoading(false);
                })

        }
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

         
console.log(movie)

    return(
        <div>
             <Navbar />
             
             <div className="detail">
               
                <section className="movieHeader">
                <MovieHeader movie={movie}/>                    
                </section>
                
             </div>
        </div>
    )
}