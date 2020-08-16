import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Category from './components/Category';
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
                        <Route exact path='/'
                            component={(props) => (
                                <Homepage 
                                    history={props.history}/>  
                            )}
                        />
                        <Route exact path='/category/:categoryId'
                            component={(props) => (
                                <Category 
                                    categoryId={props.match.params.categoryId}
                                    history={props.history}/>  
                            )}
                        />
                        <Route exact path='/posts'>
                            <PostList />
                        </Route>
                        <Route exact path='/posts/create'>
                            <CreatePost />
                        </Route>
                        <Route exact path='/posts/edit'>
                            <EditPost />
                        </Route>
                        <Route exact path='/posts/:postId'
                            component={(props) => (
                                <PostDetail 
                                    postId={props.match.params.postId}
                                    posts={props.posts}
                                    history={props.history}/>  
                            )}
                        />  
                        <Route>
                            <NoMatchPage />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );
}}

export default App;
