import './Navbar.css'

 function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="
          https://w7.pngwing.com/pngs/1011/407/png-transparent-movies-logo-the-film-television-logo.png
          "
          style={{height:'60px',width:'200px'}}
          alt="Movies Logo"
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
          <a className="btn btn-primary float-end" href="signin">
            Join Us
          </a>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
