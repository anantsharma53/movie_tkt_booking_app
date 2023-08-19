import Navbar from '../Navbar/Navbar';
import { MovieHeader } from "../MovieHeader/MovieHeader";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from '../StarRating/StarRating'
export function MovieDetail() {

    const [movie, setMovie] = useState([]);
    const[theater,setTheater] = useState([]);


    const { id } = useParams();
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
    useEffect(() => {

        const gettheater = () => {

            fetch(`http://127.0.0.1:8000/api/movie/the/${id}`)
                .then(res => res.json())
                .then(json => {
                    setTheater(json);
                    //console.log(json);
                    //setLoading(false);
                })

        }
        gettheater();

    }, []);


    console.log(movie)

    return (
        <div>
            <Navbar />
            {/* <MovieHeader movie={movie} /> */}
            <div className="detailContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center',
                // Adjust the background position as needed
            }}>
                <div className="detailsbox">
                    <div className="details" >
                        <div className="big-img">
                            <img src={movie.image} alt="" />
                        </div>

                        <div className="box">
                            <div className="row">
                                <h2>Name : {movie.title}</h2>
                                <h3>Screening: {theater.name}</h3>
                                <span>Address:{theater.address}</span>
                                <span>Date and Timing: {theater.movie_timing}</span>
                            </div>
                            <p>Language: {movie.language}</p>
                            <p>Movie Duration: {movie.movie_length}</p>
                            <p><StarRating rating={movie.rating} /></p>
                            <p>Rating: {movie.rating}</p>
                            <a href={`${movie.id}/bookticket`} class="btnBookTickets">Book Tickets</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}