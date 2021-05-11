import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import RandomArtCard from './components/art/RandomArtCard'
import ArtShow from './components/art/ArtShow'
import { getTokenFromAPI, setTokenToLocalStorage } from './lib/api'
import Footer from './components/common/Footer'
import Matches from './components/art/Matches'
import Search from './components/art/Search'


function App() {

  React.useEffect(() => {
    const getData = async () => {
      const tokenResponse = await getTokenFromAPI()
      setTokenToLocalStorage(tokenResponse.data.token)
      console.log(tokenResponse, 'token')
    }
    getData()
    setInterval(getData, 518_400_000)
  }, [])

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/artists/:artistId" component={ArtShow} />
          <Route path="/artists" component={RandomArtCard} />
          <Route path="/matches" component={Matches} />
          <Route path="/search" component={Search} />
        </Switch>
        <Footer />
      </Router>
    </>

  )
}

export default App
