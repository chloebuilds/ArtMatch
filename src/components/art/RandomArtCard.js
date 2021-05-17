import React from 'react'
import { Link } from 'react-router-dom'
import {  getAllArtists } from '../../lib/api'

function RandomArtCard() {

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

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        
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
        console.log(error)
      } finally { 
        setLoading(false)
      }
    }
    getData()
  }, [])

  if (loading || !randomArtist) {
    return <div className="loading-message">Loading aesthetic pleasure, just for you..</div>
  }

  
  return (
    <>
      <h1>Find your next ArtMatch</h1>
      <div className="art-container">
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">{randomArtist.name}</div>
          </div>
          <div className="card-image">
            <figure className="image">
              <img src={randomArtist._links.image.href.replace('{image_version}', 'large')} alt={randomArtist.name}/>
            </figure>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleUgh} className="button button-left">	
        &#10006; Ugh!</button>
          <Link to={`artists/${randomArtist.id}`}><button className="button button-right">
        &hearts; Yay!</button></ Link>
        </div>
      </div>
    </>
  )
}

export default RandomArtCard
