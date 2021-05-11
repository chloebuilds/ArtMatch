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
          <h5>Gender:</h5> {artist.gender || 'Unknown'}
        </div>
        <div className="art-card-content">
          <h5>Nationality:</h5> {artist.nationality || 'Unknown'}
        </div>
        <div>
          <div className="art-card-content">
            <h5>Location:</h5> {artist.location || 'Unknown'}
          </div>
          <div className="art-card-content">
            <h5>Birthday:</h5> {artist.birthday || 'Unknown'}
          </div>
          <div className="art-card-content">
            <h5>Death date:</h5> {artist.deathday || 'Unknown'}
          </div>
          <div className="art-card-content">
            <h5>Biography:</h5> {artist.biography || 'unknown... the dark and mysterious type'}
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