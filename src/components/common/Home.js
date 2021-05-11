import React from 'react'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="title is-1 has-text-centered">
              ArtMatch | Find aesthetic love
            <div className="button-container">
              <Link to="/artists"><button className="button button-right">Show me</button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home


