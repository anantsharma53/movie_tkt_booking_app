import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import './ShowTicket.css'
import Profile from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
function ShowTicket() {
    const token = localStorage.getItem('token')
    const[data,setData]=useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Define the URL of the API
        const apiUrl = 'http://127.0.0.1:8000/api/movies/tickets/';
    
        // Fetch data from the API using a GET request
        fetch(apiUrl,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },

          })
          .then((response) => response.json())
          .then((data) => {
            // Update the state with the fetched data
            setData(data);
            setLoading(false); // Set loading to false once data is fetched
          })
          .catch((error) => {
                
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false in case of an error
          });
      }, [token]);
      console.log(data);
   

    

    function SeatDetails({ seatDetails,theaterDetails }) {
        return (
                        <table class="container table user-list">
                            <thead>
                                <tr>
                                    <th class="text-center"><span>Sl No:</span></th>
                                    <th class="text-center"><span>Seat Number</span></th>
                                    <th class="text-center"><span>Category</span></th>
                                    <th class="text-center"><span>Price</span></th>
                                    <th class="text-center"><span>Date</span></th>
                                    <th class="text-center"><span>Movie Timing</span></th> 
                                    <th class="text-center"><span>Action</span></th>                                   
                                </tr>
                            </thead>
                            <tbody>
                                {seatDetails
                                    &&
                                    seatDetails.map((seat, index) => (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{seat.seat_number} <br /></td>
                                            <td>{seat.category}<br /></td>
                                            <td>{seat.price}</td>
                                            <td>{seat.date}</td>
                                            <td>{seat.movie_timing}</td>
                                            <td style={{ width: '20%' }}>
                                                <a href="#" class="table-link">
                                                    <span class="fa-stack">
                                                        <img src="https://www.freeiconspng.com/thumbs/laser-icon/hardware-laser-printer-icon-32.png" 
                                                        style={{width:'50px',height:'50px'}}/>
                                                    </span>
                                                </a>
                                                <a href="#" class="table-link">
                                                    <span class="fa-stack">
                                                    <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" 
                                                        style={{width:'70px',height:'70px'}}/>
                                                    </span>
                                                </a>
                                                
                                            </td>                                          
                                        </tr>
                                    ))}
                                    
                            </tbody>
                        </table>
        );
    }

    // function TheaterDetails({ theaterDetails }) {
    //     return (
    //         <div>
    //             <h2>Theater Details</h2>
    //             {theaterDetails.map(theater => (
    //                 <div key={theater.id}>
    //                     <p>ID: {theater.id}</p>
    //                     <p>Name: {theater.name}</p>
    //                     <p>Address: {theater.address}</p>
    //                     <p>City: {theater.city}</p>
    //                     <p>Pincode: {theater.pincode}</p>
    //                     <p>First Show: {theater.first_show}</p>
    //                     <p>Second Show: {theater.second_show}</p>
    //                     <p>Third Show: {theater.third_show}</p>
    //                     <p>Date: {theater.date}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }
    // if (loading) {
    //     return <div>Loading...</div>;
    //   }


    return (
        <>
            <Navbar />
            <div className="homeContainer" style={{
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',  // Adjust the background size as needed
                backgroundPosition: 'center'  // Adjust the background position as needed
            }}>
                {loading? 
        <div>Loading...</div>:
        <div className="userLogin">
            <Profile userDetails={data.user_details} theaterDetails={data.theater_details}/>
            <SeatDetails seatDetails={data.seat_details} />
            {/* <TheaterDetails theaterDetails={data.theater_details} /> */}
        </div>

      }
                

            </div>
        </>
    );
}
export default ShowTicket;



// function DisplayDetails({ data }) {
//   return (
//     <div>
//       <UserDetails userDetails={data.user_details} />
//       <SeatDetails seatDetails={data.seat_details} />
//       <TheaterDetails theaterDetails={data.theater_details} />
//     </div>
//   );
// }

// export default DisplayDetails;