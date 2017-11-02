import React, { Component } from 'react';
import ShowPosts from './showPosts';
import ShowPost from './postDetail';
import ShowCategories from './showCategories';
import '../App.css';
import { Route, Link, Switch } from 'react-router-dom';

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

          <Switch>
            <Route exact path='/' component={ShowPosts} />
            <Route exact path='/:category' component={ShowPosts} />
            <Route path='/:category/:post_id' component={ShowPost} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
