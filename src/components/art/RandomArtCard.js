import React from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromAPI, setTokenToLocalStorage, getAllArtists } from '../../lib/api'

function RandomArtCard({ id, name, image }) {

  const [artistList, setArtistList] = React.useState(null)
  const [randomArtist, setRandomArtist] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [rejected, setRejected] = React.useState([])

  function getRandomArtist(artists, rejected) {
    const filteredArtists = artists.filter((artist) => {
      const isRejected = rejected.includes(artist.id)
      return !isRejected
    })
    return filteredArtists[Math.floor(Math.random() * filteredArtists.length)]
  }

  function handleUgh() {
    const updatedRejected = [ ...rejected, randomArtist.id ] 
    const newRandomArtist = getRandomArtist(artistList, updatedRejected)
    setRejected(updatedRejected)
    setRandomArtist(newRandomArtist)
  }

  function handleYay() {
    
  }

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const tokenResponse = await getTokenFromAPI()
        setTokenToLocalStorage(tokenResponse.data.token)
        const res = await getAllArtists()
        const artists = res.data._embedded.artists
        const artistsWithRequisiteDetails = artists.filter(artist => {
          return (
            !!artist.name &&
            !artist.name.startsWith('Attributed') &&
            !!artist.location &&
            !!artist.gender &&
            !!artist._links.image.href
          )
        })          
        setArtistList(artistsWithRequisiteDetails) 
        const random = getRandomArtist(artists, [])
        setRandomArtist(random) 
      } catch (err) {
        setError(err)
      } finally { 
        setLoading(false)
      }
    }
    getData()
  }, [])

  if (loading || !randomArtist) {
    return <h1>Loading</h1>
  }


  return (
    <div className="art-container">
      <Link to={`artists/${id}`}>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">{randomArtist.name}</div>
          </div>
          <div className="card-image">
            <figure className="image">
              <img style={{ minWidth: 500 }} src={randomArtist._links.image.href.replace('{image_version}', 'large')} alt={name}/>
            </figure>
          </div>
          <div className="art-card-content">
            <h5>Location: {randomArtist.location}</h5>
          </div>
        </div>
      </ Link>
      <button onClick={handleUgh} className="button">	
        &#10006; Ugh!</button>
      <Link to="/:artistId"><button onClick={handleYay} className="button">
        &hearts; Yay!</button></ Link>
    </div>
  )
}

export default RandomArtCard

//{randomArtist.name} {randomArtist.location}  