import React, { useState } from "react";
import "./SeatLayout.css"; // Import your CSS for styling
import { useNavigate } from 'react-router-dom';
function SeatLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_details'));
  const isSuperUser = user && user.is_superuser;
  const token = localStorage.getItem('token')
  const { theaterdetails } = props;
  console.log(theaterdetails);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatprice = 150;
  const totalPrice = seatprice*(selectedSeats.length);
  const handleSeatClick = (seatNumber) => {
    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Generate a grid of seats (you can customize this based on your needs)
  const rows = 5;
  const seatsPerRow = 10;

  const renderSeats = () => {
    const seatComponents = [];
    console.log(selectedSeats)
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = `${row}-${seat}`;
        const isReserved = false; // You can implement your logic for reserved seats

        seatComponents.push(
          <div
            key={seatNumber}
            className={`seat ${isReserved ? "reserved" : ""} ${selectedSeats.includes(seatNumber) ? "selected" : ""
              }`}
            onClick={() => !isReserved && handleSeatClick(seatNumber)}
          >
            {seatNumber}

          </div>
        );
      }
    }

    return seatComponents;
  };
  
  const handleBookSeats = () => {
    if (token) {

      // Create an object with the booking data
      const bookingData = {
        theater: theaterdetails.id,
        seats: selectedSeats,
        movie_id: theaterdetails.movie,
        is_reserved: true,
        category: 'silver',
        price: 200.00,

      };
      console.log(bookingData);
      // Send a POST request to the book-seat API
      fetch('http://127.0.0.1:8000/api/movies/book-seat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (response.status === 201) {
            // Booking successful, you can handle this case as needed (e.g., show a confirmation message)
            console.log('Seats booked successfully');
          } else if (response.status === 400) {
            // Handle validation errors or seat availability errors
            console.log('Booking failed. One or more seats are already reserved.');
          } else {
            // Handle other errors
            console.error('Booking failed. Server error.');
          }
        })
        .catch((error) => {
          console.error('Booking failed. Network error:', error);
        });
    } else {
      navigate('/signin');
      
    }
  };

  return (
    <>
      <div className="seat-layout">
        <h2>Select Seat</h2>
        {/* <div className="screen">Screen</div> */}
        <div className="seats">{renderSeats()}</div>

        <div className="legend">
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat reserved"></div>
            <span>Reserved</span>
          </div>
        </div>
        <div>
          <h3>Price:{selectedSeats.length * seatprice}</h3>

        </div>

      </div>
      {
        selectedSeats.length !== 0 ?
        <button class="btnBookTickets" onClick={handleBookSeats}>Book Selected Seats</button>
        :
        <button class="btnBookTickets" disabled>Book Selected Seats</button>
      }
     
    </>
  );
}

export default SeatLayout;
