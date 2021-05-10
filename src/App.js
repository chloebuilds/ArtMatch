import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import { getTokenFromAPI } from './lib/api'

function App() {
  //useEffect  that makes the API call to get the token
  //update the token in state with the value from the response
  //pass down the token as props to all components that need it
  //const [randomArt, setRandomArt] = React.useState([])
  //const [error, setError] = React.useState(null)
  //const [loading, setLoading] = React.useState(false)
  

  React.useEffect(() => {
    const getData = async () => {
      //setLoading(true)
      //try {
      const response = await axios.get('https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45')
      
      getTokenFromAPI()
      console.log(response.data)
      //setRandomArt(response.data)
      //} 
      //catch (err) {
      //setError(err)
      //} finally {
      //setLoading(false)
      //}
    }
    getData()
  }, [])



  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
    
  )
}

export default App
