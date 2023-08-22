import { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import './ShowTicket.css'
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


    function UserDetails({ userDetails }) {
        return (
            <div>
                <h2>User Details</h2>
                <p>ID: {userDetails.id}</p>
                <p>Name: {userDetails.name}</p>
                <p>Username: {userDetails.username}</p>
                <p>Email: {userDetails.email}</p>
                <p>Mobile Number: {userDetails.mobile_number}</p>
            </div>
        );
    }

    function SeatDetails({ seatDetails }) {
        return (
            <div>
                <h2>Seat Details</h2>
                {seatDetails.map(seat => (
                    <div key={seat.id}>
                        <p>ID: {seat.id}</p>
                        <p>Seat Number: {seat.seat_number}</p>
                        <p>Is Reserved: {seat.is_reserved ? 'Yes' : 'No'}</p>
                        <p>Category: {seat.category}</p>
                        <p>Price: {seat.price}</p>
                        <p>Date: {seat.date}</p>
                        <p>Movie Timing: {seat.movie_timing}</p>
                    </div>
                ))}
            </div>
        );
    }

    function TheaterDetails({ theaterDetails }) {
        return (
            <div>
                <h2>Theater Details</h2>
                {theaterDetails.map(theater => (
                    <div key={theater.id}>
                        <p>ID: {theater.id}</p>
                        <p>Name: {theater.name}</p>
                        <p>Address: {theater.address}</p>
                        <p>City: {theater.city}</p>
                        <p>Pincode: {theater.pincode}</p>
                        <p>First Show: {theater.first_show}</p>
                        <p>Second Show: {theater.second_show}</p>
                        <p>Third Show: {theater.third_show}</p>
                        <p>Date: {theater.date}</p>
                    </div>
                ))}
            </div>
        );
    }
    if (loading) {
        return <div>Loading...</div>;
      }


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
        <div>
                    <UserDetails userDetails={data.user_details} />
                    <SeatDetails seatDetails={data.seat_details} />
                    <TheaterDetails theaterDetails={data.theater_details} />
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