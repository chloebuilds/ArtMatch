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
    console.log(artists)
    const filteredArtists = artists.filter((artist) => {
      const isRejected = rejected.includes(artist.id)
      return !isRejected
    })
    console.log(filteredArtists)
    return filteredArtists[Math.floor(Math.random() * filteredArtists.length)]
  }



  function handleUgh() {
    const updatedRejected = [ ...rejected, randomArtist.id ] 
    setRejected(updatedRejected)
    const newRandomArtist = getRandomArtist(artistList, updatedRejected)
    setRandomArtist(newRandomArtist)
  }
  console.log('randomArtist', randomArtist)
  function handleYay() {
    
  }

  React.useEffect(() => {
    const getData = async () => {
      console.log('hello')
      setLoading(true)
      try {
        const tokenResponse = await getTokenFromAPI()
        setTokenToLocalStorage(tokenResponse.data.token)
        const res = await getAllArtists()
        const artists = res.data._embedded.artists
        const artistsWithRequisiteDetails = artists.filter(artist => !!artist.name && !!artist.location && !!artist.gender)
        setArtistList(artistsWithRequisiteDetails) 
        const random = getRandomArtist(artists, [])
        console.log(random, 'random')
        setRandomArtist(random) 
      } catch (err) {
        setError(err)
      } finally { 
        setLoading(false)
      }
    }
    getData()
  }, [])


  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`artists/${id}`}>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">Name: {randomArtist.name}</div>
          </div>
          <div className="card-image">
            <figure className="image">Image:
              <img style={{ height: 250, width: 'auto', margin: '10px auto 0' }} src={randomArtist._links.image.href.replace('{image_version}', 'square')} alt={name}/>
            </figure>
          </div>
          <div className="card-content">
            <h5>Location: {randomArtist.location}</h5>
          </div>
        </div>
      </ Link>
      <button onClick={handleUgh} className="button">Ugh!</button>
      <button onClick={handleYay} className="button">Yay!</button>
    </div>
  )
}

export default RandomArtCard

