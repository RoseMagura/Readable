import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const NoMatchPage = () => {
    return(
        <h3>404 - Not found</h3>
    )
}    

class App extends Component {
    render(){
        return (
            <Provider store={createStore(reducer, middleware)}>
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
            </Provider>
        );
}}

export default App;
