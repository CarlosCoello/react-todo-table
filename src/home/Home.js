import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const  Home = (props) => {

    return (
      <div className="homeWrapper">
        <header className="jumbotron">
          <h1>Welcome to Home page</h1>
          <Link to="/todos" className="btn btn-primary">View TODOS</Link>
        </header>
      </div>
    )
    
}

export default Home;
