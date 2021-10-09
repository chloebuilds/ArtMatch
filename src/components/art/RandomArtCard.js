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
    // creating an array of filteredArtists
    const filteredArtists = artists.filter((artist) => {
      // isRejected stores rejected artist.id
      const isRejected = rejected.includes(artist.id)
      // only returning the not rejected artists
      return !isRejected
    })
    // return a random filtered artist without rejected artists
    return filteredArtists[Math.floor(Math.random() * filteredArtists.length)]
  }

  function handleUgh() {
    // when the handleUgh function is called then updateRejected spreads the rejected array and adds the new rejected randomArtist.id
    const updatedRejected = [ ...rejected, randomArtist.id ] 
    // newRandomArtist stores the output of getRandomArtist passing in the artistList and updateRejected
    const newRandomArtist = getRandomArtist(artistList, updatedRejected)
    setRejected(updatedRejected)
    setRandomArtist(newRandomArtist)
  }

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        
        const res = await getAllArtists()
        // getting the artists from the response
        const artists = res.data._embedded.artists
        // an array of filtered artists
        const artistsWithRequisiteDetails = artists.filter(artist => {

          return (
            //filter through the artists and using !! to convert it to a boolean to check if the response does have those details, 
            // if it does then add to artistsWithRequisiteDetails 
            !!artist.name &&
            !artist.name.startsWith('Attributed') &&
            !!artist.location &&
            !!artist.gender &&
            !!artist._links.image.href
          )
        })          
        // setting setArtistList with artistsWithRequisiteDetails 
        setArtistList(artistsWithRequisiteDetails) 
        // passing an empty array because the function takes 2 arguments has an array method - .filter()
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
  }, [error])

  // if loading is true or randomArtist is false  
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
          <Link className="no-outline" to={`artists/${randomArtist.id}`}><button className="button button-right">
        &hearts; Yay!</button></ Link>
        </div>
      </div>
    </>
  )
}

export default RandomArtCard
