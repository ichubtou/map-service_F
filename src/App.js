import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import ListMarkerComponent from './components/ListMarkerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMarkerComponent from './components/CreateMarkerComponent';
import ReadMarkerComponent from './components/ReadMarkerComponent';
import SignupComponent from './components/SignupComponent';
import LoginComponent from './components/LoginComponent';
import MemberInfoChange from './components/MemberInfoChange';

class App extends Component {
  render() {
  return (
    <div>
    <Router>
    <HeaderComponent/>
        <div>
          <Switch>
            <Route exact path="/" component={ListMarkerComponent}></Route>
            <Route path="/marker" component={ListMarkerComponent}></Route>
            <Route path="/create-marker/:markerId" component={CreateMarkerComponent}></Route>
            <Route path="/read-marker/:markerId" component={ReadMarkerComponent}></Route>
            <Route path="/singup" component={SignupComponent}></Route>
            <Route path="/login" component={LoginComponent}></Route>
            <Route path="/infochange" component={MemberInfoChange}></Route>
          </Switch>
        </div>
    <FooterComponent/>
     </Router>
  </div>
  );
  }
  }

export default App;

