import { Link } from 'react-router-dom';

function NavbarLogin() {
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
              MyApp
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
      
                {/* <li className="nav-item ">
                  <Link className="nav-link active" to="/test">
                    Test
                  </Link>
                </li> */}
                <div className="ms-auto">
                  <li className="nav-item ">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                </div>
                <div className="ms-auto">
                  <li className="nav-item ">
                    <Link className="nav-link active" to="/register">
                      Register
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </nav>
    </div>
  );
}

export default NavbarLogin;