import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          🎨 ArtMatch
          </Link>
          <Link className="navbar-item" to="/artists"> 
          Find your Art match! </Link>
          <Link className="navbar-item" to="/matches">
          Your Matches 
          </Link>
          <Link className="navbar-item" to="/search">
          Search 
          </Link>
        </div>
      </div>
    </nav>
  )

}

export default Nav