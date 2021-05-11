import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { getSingleArtist } from '../../lib/api'

function ArtShow() {

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
        <p> Something went wrong....</p>
      } finally {
        setLoading(false)
      }

    }
    getData()
  }, [artistId])

  if (loading || !artist) {
    return <h1>Loading</h1>
  }
  console.log('name:', artist, artist.name)
  console.log('location', !!artist.location)

  return (
    <div className="art-container">
      <h1>Find out more about your ArtMatch..</h1>
      <div className="artshow-container">
        <div className="card-header">
          <div className="card-header-title">{artist.name}</div>
        </div>
        <figure className="image">
          <img style={{ minWidth: 500 }} src={artist._links.image.href.replace('{image_version}', 'large')} alt={artist.name}/>
        </figure>
        <div className="art-card-content">
          <h6>Gender:</h6> {artist.gender}
        </div>
        <div className="art-card-content">
          <h6>Nationality:</h6> {artist.nationality}
        </div>
        <div>
          <div className="art-card-content">
            <h6>Location:</h6> {artist.location}
          </div>
          <div className="art-card-content">
            <h6>Birthday:</h6> {artist.birthday}
          </div>
          <div className="art-card-content">
            <h6>Death date:</h6> {artist.deathday || 'Unknown'}
          </div>
          <div className="art-card-content">
            <h6>Biography:</h6> {artist.biography || 'unknown: the dark and mysterious type'}
          </div>
          <div>
            <Link to="/artists"><button className="button">
        &hearts; find more matches</button></ Link>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default ArtShow