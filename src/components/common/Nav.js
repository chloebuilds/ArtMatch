import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  

  return (
    <nav className="navbar  px-5">
      <div className="navbar-brand">
        
        
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item has-text-white" to="/">
          🎨 ArtMatch
          </Link>
          <Link className="navbar-item has-text-white" to="/artists">
            Find your Art match! </Link>
          <Link className="navbar-item has-text-white" to="/matches">
            Your Matches
          </Link>
        </div>
        <div className="navbar-end">
          <Link className="navbar-item has-text-white" to="/search">
            Search
          </Link>
        </div>
      </div>
    </nav>
  )

}

export default Nav