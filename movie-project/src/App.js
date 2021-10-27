import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/pages/index'
import Navbar from './components/layout/navbar'
import Movies from './components/pages/movies'
import MovieDetail from './components/pages/movie_detail'
import Tvshows from './components/pages/tvshows'
import People from './components/pages/peoples'
import TvshowDetail from './components/pages/tvshow_detail'
import PeopleDetail from './components/pages/people_detail'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Search from './components/pages/search'
import List from './components/pages/user_menu/list'
import Favorite from './components/pages/user_menu/favorite'
import Bookmark from './components/pages/user_menu/bookmark'

import { Container } from 'react-bootstrap';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Container>
            <Switch>

              <Route path="/" exact component={()=><Home/>}/>

              <Route path="/movies" exact component={()=><Movies/>}/>
              <Route path="/tvshows" exact component={()=><Tvshows/>}/>
              <Route path="/peoples" exact component={()=><People/>}/>

              <Route path="/movie/:id" exact component={()=><MovieDetail/>}/>
              <Route path="/tvshow/:id" exact component={()=><TvshowDetail/>}/>
              <Route path="/people/:id" exact component={()=><PeopleDetail/>}/>

              <Route path="/login" exact component={()=><Login/>}/>
              <Route path="/register" exact component={()=><Register/>}/>

              <Route path="/search/:query" exact component={()=><Search/>}/>

              <Route path="/list" exact component={()=><List/>}/>
              <Route path="/favorite" exact component={()=><Favorite/>}/>
              <Route path="/bookmark" exact component={()=><Bookmark/>}/>

            </Switch>
          </Container>
      </Router>
    </div>
  );
}

export default App;