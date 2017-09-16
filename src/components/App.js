import React, { Component } from 'react';
import ShowPosts from './showPosts';
import '../App.css';
import { fetchPosts, fetchCategories } from '../utils/api'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="posts-container">
          <ShowPosts />
        </div>
      </div>
    );
  }
}

export default App;
