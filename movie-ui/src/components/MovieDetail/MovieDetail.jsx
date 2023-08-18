import Navbar from '../Navbar/Navbar';
import { MovieHeader } from "../MovieHeader/MovieHeader";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export function MovieDetail(){

    const [movie, setMovie] = useState([]);


    const {id} = useParams();
    console.log(id)


    useEffect(() => {

        const getProduct = () => {
         
            fetch(`http://127.0.0.1:8000/api/movie/${id}`)
                .then(res => res.json())
                .then(json => {
                    setMovie(json);
                    //console.log(json);
                    //setLoading(false);
                })

        }
        getProduct();
        
    }, []);

         
console.log(movie)

    return(
        <div>
             <Navbar />
             <MovieHeader movie={movie}/>
             
        </div>
    )
}