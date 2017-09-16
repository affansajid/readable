import React, { Component } from 'react';
import ShowPosts from './showPosts';
import ShowPost from './postDetail';
import ShowCategories from './showCategories';
import '../App.css';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <Link to="/" className="home-link"><h1>Readable</h1></Link>
          <p>Top articles for React</p>
          <ShowCategories />
        </header>
        <div className="posts-container">
          <Route exact path='/' render={() => (
            <div>
              <ShowPosts />
            </div>
          )}/>
          <Route path='/category/:category' component={ShowPosts} />

          <Route path='/posts/:id' component={ShowPost} />
        </div>
      </div>
    );
  }
}

export default App;
