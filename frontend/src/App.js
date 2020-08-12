import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const NoMatchPage = () => {
    return(
        <h3>404 - Not found</h3>
    )
}    

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Homepage />  
                </Route>
                <Route exact path='/posts'>
                    <PostList />
                </Route>
                <Route path='/posts/create'>
                    <CreatePost />
                </Route>
                <Route exact path='/posts/edit'>
                    <EditPost />
                </Route>  
                <Route>
                    <NoMatchPage />
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

export default App;
