import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          🎨
          </Link>
          <Link className="navbar-item" to="/artists"> Artists </Link>
          {/* <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/search">
          Search
              </Link>
              <Link className="navbar-item" to="/">
          Likes 
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  )

}

export default Nav