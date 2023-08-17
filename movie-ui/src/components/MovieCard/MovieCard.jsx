import { Card } from 'primereact/card'
import './MovieCard.css'
 function MovieCard({ movie }) {
    // const dataFromParent = props.movie
    // const header = <img alt=""src={movie.image}  width="410" height="320"/>
    const header = <img alt=""src={ movie.image }  class="img-fluid"/>
    return (
      <div class="card"  >
        <Card  title={movie.title} header={header} className="md:w-25rem">
          <div class="content">
            <hr />
            <div class="ratings">
              <div>
                <img src="https://pixner.net/boleto/demo/assets/images/movie/tomato.png"></img>
                &nbsp;&nbsp;
                <span>{movie.rating}</span>
              </div>
  
              <div>
                <img
                  src="https://pixner.net/boleto/demo/assets/images/movie/cake.png"
                  alt=""
                />
                &nbsp;&nbsp;
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
  export default MovieCard
  