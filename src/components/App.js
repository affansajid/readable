import React, { Component } from 'react';
import ShowPosts from './showPosts';
import ShowCategories from './showCategories';
import '../App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="posts-container">
          <ShowCategories />
          <ShowPosts />
        </div>
      </div>
    );
  }
}

export default App;
