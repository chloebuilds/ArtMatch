import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { getSingleArtist } from '../../lib/api'

function ArtShow() {
  // useParams is getting the id from the url
  const { artistId } = useParams()
  const [artist, setArtist] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => { 
    const getData = async () => {
      setLoading(true)
      try {
        const response = await getSingleArtist(artistId)
        setArtist(response.data)
      } catch (err) {
        <p> Oh no! Something went wrong....</p>
      } finally {
        setLoading(false)
      }

    }
    getData()
  }, [artistId])

  if (loading || !artist) {
    return (
      <div className="loading-message">
        <h3>Connecting you to your ArtMatch</h3>
      </div> 
    )
  }
  console.log('name:', artist, artist.name)
  console.log('location', !!artist.location)

  return (
    <div className="art-container">
      <h1>More on your ArtMatch..</h1>
      <div className="artshow-container">
        <div className="card-header">
          <div className="card-header-title"><p className="artist-name">{artist.name}</p></div>
        </div>
        <div className="card-image">
          <figure className="image">
            {/* .replace() is adding the large.jpg version to the image url  */}
            <img src={artist._links.image.href.replace('{image_version}', 'large')} alt={artist.name}/>
          </figure>
        </div>
        <div className="art-card-content">
          <h5>Gender: <span className="data">{artist.gender || 'Unknown'}</span></h5>
        </div>
        <div className="art-card-content">
          <h5>Nationality: <span className="data">{artist.nationality || 'Unknown'}</span></h5>
        </div>
        <div>
          <div className="art-card-content">
            <h5>Location: <span className="data">{artist.location || 'Unknown'}</span></h5>
          </div>
          <div className="art-card-content">
            <h5>Birth year: <span className="data">{artist.birthday || 'Unknown'}</span></h5>
          </div>
          <div className="art-card-content">
            <h5>Deceased: <span className="data">{artist.deathday || 'Unknown'}</span></h5>
          </div>
          <div className="art-card-content">
            <h5>Biography: <span className="data">{artist.biography || 'Unknown... the dark and mysterious type'}</span></h5>
          </div>
          <div>
            <Link to="/artists"><button className="button button-right">
        &hearts; find more matches</button></ Link>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default ArtShow