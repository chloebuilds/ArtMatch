import React from 'react'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="title is-1 has-text-centered">
              ArtFinder
            <h4>Find your new Art match..</h4>
            <Link to="/App.js"><button>Click me</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home


