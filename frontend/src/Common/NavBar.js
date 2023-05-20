import React from "react";

function NavBar() {
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand text-primary font-weight-bold " href="/">
            Power For You
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active ">
                <a className="nav-link" href="/">
                  Home <span className="sr-only ">(current)</span>
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/list_customer">
                  Customer<span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link disabled" href="/list_staff">
                  Staff <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link disabled" href="/list_power">
                  Power Source<span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link disabled" href="/list_area">
                  Area <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 m-5">
              <button
                className="btn btn-primary my-2 my-sm-0 mr-4"
                type="submit"
              >
                Sign In
              </button>
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
