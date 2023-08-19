import React, { useEffect } from "react";
import { useState } from "react";
import './Dashboard.css'
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MovieUpload from "../MovieUpload/MovieUpload";
import MovieThUpload from "../THEMovie/THEMovie";
function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user_details'));
    const isSuperUser = user && user.is_superuser;
    const token = localStorage.getItem('token')
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    // Function to fetch movie list List from the API
    function movieList(pageNumber) {
        fetch(`http://127.0.0.1:8000/api/movies/list?page=${pageNumber}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            }

        )
            .then((res) => res.json())
            .then((jsonResponse) => {
                const resultsArray = jsonResponse.results;
                console.log(resultsArray)
                setMovie(resultsArray);
                const numPages = jsonResponse.num_pages;
                setTotalPages(numPages);
                // const resultsArray = jsonResponse.results.results;
                // setUsers(resultsArray);
                // const numPages = jsonResponse.results.num_pages;
                // setTotalPages(numPages);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }




    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        localStorage.setItem("currentPage", pageNumber);
    }
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        setCurrentPage(storedPage ? parseInt(storedPage) : 1);
        movieList(currentPage);
    }, [currentPage]);

    console.log(movie);

    const openModal = () => {
        setShowModal(true);
    };
    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <div className="buttonContainer">
            <button type="button" className="openModalBtn" onClick={openModal}>
                        Upload Movie
                    </button>
                    <button type="button" className="openModalBtn" onClick={openModal2}>
                        Update Theater Movie
                    </button>
                    <button type="button" className="openModalBtn" onClick={openModal}>
                        Upload Movie
                    </button>
                    <button type="button" className="openModalBtn" onClick={openModal}>
                        Upload Movie
                    </button>
            
            
            </div>
            <div className="dashboardContainer">
            
                    
                    
                
                <div className="userDetail">
                    <h2 className="welcomeText">Your Profile Details</h2>
                    <h2 className="welcomeUserText">Name: {user.name}</h2>
                    <h2 className="welcomeUserText">Username: {user.username}</h2>
                    <h2 className="welcomeUserText">Email: {user.email}</h2>
                    <h2 className="welcomeUserText">Mobile Number: {user.mobile_number}</h2>
                </div>
                <div>             
                {isSuperUser &&
                    (<div class="container mt-5 table">
                        <div class="row ">
                            <div class="main-box clearfix ">
                                <div class="table-responsive">
                                    <table class="table user-list">
                                        <thead>
                                            <tr>
                                                <th class="text-center"><span>Sl No</span></th>
                                                <th class="text-center"><span>ID </span></th>
                                                <th class="text-center"><span>Name</span></th>
                                                <th class="text-center"><span>Director</span></th>
                                                <th class="text-center"><span>Category(genre)</span></th>
                                                <th class="text-center"><span>Language</span></th>
                                                <th class="text-center"><span>Rating</span></th>
                                                <th class="text-center"><span>Duration in mins</span></th>
                                                <th class="text-center"><span>Poster</span></th>
                                                <th class="text-center"><span>Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movie
                                                &&
                                                movie.map((movies, index) => (
                                                    
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{movies.id}</td>
                                                        <td>{movies.title}</td>
                                                        <td>{movies.director}</td>
                                                        <td>{movies.genre}</td>
                                                        <td>{movies.language}</td>
                                                        <td>{movies.rating}</td>
                                                        <td>{movies.movie_length}</td>
                                                        <td>
                                                            <img src={movies.image} alt="" />
                                                            
                                                        </td>
                                                        
                                                        {
                                                            user.is_superuser === true ? <td>Supar Admin</td> :
                                                                <td style={{ width: '20%' }}>
                                                                    <a href="#" class="table-link">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                    <a href="#" class="table-link">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                    <a href="#" class="table-link danger">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                </td>

                                                        }


                                                    </tr>
                                                ))}

                                        </tbody>
                                    </table>

                                    <div class="pagination-container">
                                        <ul class="pagination ">
                                            <li class="page-item ">
                                                {
                                                    currentPage > 1 ? <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                    >
                                                        Previous
                                                    </button> :
                                                        <button
                                                            className="page-link disabled"

                                                        >
                                                            Previous
                                                        </button>
                                                }
                                            </li>
                                            {/* <li><a href="#"><i class="fa fa-chevron-left"></i></a></li> */}
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li class="page-item"
                                                    key={index + 1}
                                                    onClick={() => handlePageChange(index + 1)}
                                                    disabled={currentPage === index + 1}
                                                >
                                                    <button class="page-link">{index + 1}</button>
                                                </li>
                                            ))}
                                            <li class="page-item ">
                                                {
                                                    currentPage < totalPages ? <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                    >
                                                        Next
                                                    </button> :
                                                        <button className="page-link disabled" >
                                                            Next
                                                        </button>
                                                }
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>)
                }
                </div> 

{showModal && <MovieUpload setShowModal={setShowModal} />}
{showModal2 && <MovieThUpload setShowModal2={setShowModal2} />}

            </div>


        </>

    );
}
export default Dashboard;