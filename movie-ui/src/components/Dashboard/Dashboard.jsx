import React, { useEffect } from "react";
import { useState } from "react";
import './Dashboard.css'
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user_details'));
    const isSuperUser = user && user.is_superuser;
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // Function to fetch User List from the API
    function userList(pageNumber) {
        fetch(`http://127.0.0.1:8000/api/userlist/?page=${pageNumber}`,
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
                setUsers(resultsArray);
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
        userList(currentPage);
    }, [currentPage]);
   

    return (
        <>
        <Navbar/>
        <div className="dashboardContainer">
        <div className="userDetail">
                <h2 className="welcomeText">HELLO</h2>
                <h2 className="welcomeSubText">{user.name}</h2>
        </div>
            
            
                {isSuperUser ?
                    (<div class="container mt-5 table">
                        <div class="row ">

                            <div class="main-box clearfix ">
                                <div class="table-responsive">
                                    <table class="table user-list">
                                        <thead>
                                            <tr>
                                                <th class="text-center"><span>Sl No</span></th>
                                                <th class="text-center"><span>Name</span></th>
                                                <th class="text-center"><span>User Name</span></th>
                                                <th class="text-center"><span>Email</span></th>
                                                <th class="text-center"><span>Mobile number</span></th>
                                                <th class="text-center"><span>Actions</span></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users
                                                &&
                                                users.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                            <a href="#" class="user-link">{user.name}</a>
                                                        </td>
                                                        <td class="text-center">{user.username}</td>
                                                        <td class="text-center">
                                                            <a href="#">{user.email}</a>
                                                        </td>
                                                        <td>{user.mobile_number}</td>
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
                                </div>
                                <div class="pagination-container">
                                    <ul class="pagination ">
                                        <li class="page-item ">
                                            {
                                                currentPage>1?<button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                >
                                                    Previous
                                                </button>:
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
                                                currentPage<totalPages?<button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                >
                                                    Next
                                                </button>:
                                                <button className="page-link disabled" >                                                                
                                                Next
                                            </button>
                                            }
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>) : (<></>)
                }
            


            </div>

            
        </>

    );
}
export default Dashboard;