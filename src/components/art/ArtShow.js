import React from 'react'
import { useParams } from 'react-router-dom'

import { getSingleArtist } from '../../lib/api'

function ArtShow() {

  const { artistId } = useParams()
  const [artist, setArtist] = React.useState(null)

  React.useEffect(() => { 
    const getData = async () => {
      try {
        const response = await getSingleArtist(artistId)
        setArtist(response.data)
      } catch (err) {
        <p> Something went wrong....</p>
      }

    }
    getData()
  }, [artistId])
  

  return <h1>Artist info</h1>
}

export default ArtShow