import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import Nav from './components/common/Nav'

function App() {
  //useEffect  that makes the API call to get the token
  //update the token in state with the nex value from the response
  //pass down the token as props to all components that need it
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
