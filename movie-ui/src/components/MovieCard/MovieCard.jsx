import { Card } from 'primereact/card'
import './MovieCard.css'
import StarRating from '../StarRating/StarRating'
//  function MovieCard({ movie }) {
//     // const dataFromParent = props.movie
//     // const header = <img alt=""src={movie.image}  width="410" height="320"/>
//     const header = <img alt=""src={ movie.image }  class="img-fluid"/>
//     return (
//       <div class="card"  >
//         <Card  title={movie.title} header={header} className="md:w-25rem">
//           <div class="content">
//             <hr />            
//           </div>
//         </Card>
//         <span><StarRating rating={movie.rating} /></span>
//       </div>
//     )
//   }
//   export default MovieCard

const MovieCard = ({ movie }) => {
  const header = <img alt="" src={movie.image} className="img-fluid" />;
  
  const cardStyles = {
    backgroundColor: 'white', // Set the desired background color
    border: '0px solid #ddd', // Add a border for a clean look
    borderRadius: '5px', // Add border radius
    // padding: '1rem' // Add padding to the card content
  };

  return (
    <div className="p-col-12 p-md-4">
      <Card title={movie.title} subTitle={`Rating: ${movie.rating}`} header={header} style={cardStyles}>
        <div className="content">
          {/* <hr /> */}
          {/* Include the StarRating component */}
          <StarRating rating={movie.rating} />
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;