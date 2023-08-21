import React, { useState, useEffect } from "react";
import "./THEMovie.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function MovieThUpload({ setShowModal2 }) {
    const token = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const navigate = useNavigate();
    const [allmovies, setallMovies] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/movies/all/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status !== 200) {
                    // Token expired, perform the redirect here
                    window.location.href = "/login";
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => setallMovies(data))
            .catch((error) => console.log(error));
    }, [token]);

    const handleMovieSelection = (value) => {
        setSelectedMovie(value);
        console.log(selectedMovie)
    };
    console.log(allmovies);
    const handleSubmit = (values) => {
        const theaterData = {
            name: values.name,
            address: values.address,
            city: values.city,
            pincode: values.pincode,
            movie_timing: values.movie_timing,
        };
        console.log(theaterData)

        fetch(`http://127.0.0.1:8000/api/movies/${selectedMovie}/add_theater/`, {
            method: "POST",
            body: JSON.stringify(theaterData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    alert("Successful Uploaded");
                    document.getElementById("movie-form").reset();
                    navigate("/dashboard"); // Redirect to another page after successful upload
                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div>
                        <h3>Upload Movie</h3>
                    </div>
                    <div>
                        <button onClick={() => setShowModal2(false)}>X</button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name: "",
                        address: "",
                        city: "",
                        pincode: "",
                        movie_timing: "",
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Theater Name is required"),
                        address: Yup.string().required("Address is required"),
                        city: Yup.string().required("City is required"),
                        pincode: Yup.string().required("Pincode is required"),
                        movie_timing: Yup.string().required("Movie Timing is required"),
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form id="movie-form">
                        <div className="searchOption">
                            <select
                                name="selectedMovie"
                                value={selectedMovie}
                                onChange={(e) => handleMovieSelection(e.target.value)}
                            >
                                <option value="">Select Movie</option>
                                {allmovies.map((allmovies) => (
                                    <option key={allmovies.id} value={allmovies.id}>
                                        {allmovies.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Theater Name </label>
                            <Field
                                name="name"
                                type="text"
                                className="form-control"
                            />

                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field name="address" type="text" onInput={(e) => {
                                movies.address = e.target.value;
                                setMovies(movies)
                            }} className='form-control' />

                        </div>
                        <div className="form-group">
                            <label htmlFor="city" >Name of the City</label>
                            <Field name="city" type="text" onInput={(e) => {
                                movies.city = e.target.value;
                                setMovies(movies)
                            }} className='form-control' />

                        </div>
                        <div className="form-group">
                            <label htmlFor="pincode">pincode</label>
                            <Field name="pincode" type="text" onInput={(e) => {
                                movies.pincode = e.target.value;
                                setMovies(movies)
                            }} className='form-control' />

                        </div>
                        <div className="form-group">
                            <label htmlFor="movie_timing">movie_timing</label>
                            {/* <Field name="movie_timing" type="date" onInput={(e) => {
                                    movies.movie_timing = e.target.value;
                                    setMovies(movies)
                                }} className='form-control' /> */}
                            <Field
                                name="movie_timing"
                                type="date"
                                onInput={(e) => {
                                    const newValue = e.target.value; // Get the new date value from the input
                                    setMovies((prevMovies) => ({
                                        ...prevMovies,
                                        movie_timing: newValue, // Update the movie_timing field in the state
                                    }));
                                }}
                                className="form-control"
                            />

                        </div>
                        <div className="footer">
                            <button onClick={() => setShowModal2(false)} id="cancelBtn">
                                Cancel
                            </button>
                            <button type="submit">Continue</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default MovieThUpload;
