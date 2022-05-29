import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import ListMarkerComponent from './components/ListMarkerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMarkerComponent from './components/CreateMarkerComponent';
import ReadMarkerComponent from './components/ReadMarkerComponent';

function App() {
  return (
    <div>
    <Router>
    <HeaderComponent/>
        <div>
          <Switch>
            <Route path="/" exact component={ListMarkerComponent}></Route>
            <Route path="/marker" component={ListMarkerComponent}></Route>
            <Route path="/create-marker/:markerId" component={CreateMarkerComponent}></Route>
            <Route path="/read-marker/:markerId" component={ReadMarkerComponent}></Route>
          </Switch>
        </div>
    <FooterComponent/>
     </Router>
  </div>
  );
}

export default App;

