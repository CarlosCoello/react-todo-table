import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './home/Home';
import Todos from './todos/Todos';
import Contact from './contact/Contact';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <br />
          <div className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/todos" component={Todos}/>
            <Route path="/contact" component={Contact}/>
          </div>
          <br />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
