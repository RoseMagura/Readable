import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import CreateComment from './components/CreateComment';
import EditComment from './components/EditComment';
import CommentDetail from './components/CommentDetail';
import Category from './components/Category';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { connect } from 'react-redux';
import { handleGetAllPosts, handleGetCategories } from './actions/shared';

const NoMatchPage = () => {
    return(
        <h3>404 - Not found</h3>
    )
}    

class App extends Component {
    componentDidMount () {
        this.props.dispatch(handleGetCategories());
        this.props.dispatch(handleGetAllPosts())
    }
    render(){
        return (
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
                        <Route 
                            exact path='/posts/create'
                            component={(props) => (
                                <CreatePost 
                                    history={props.history}/>  
                            )}
                        />
                        <Route exact path='/posts/:postId/edit'>
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
                        <Route 
                            exact path='/comments/create'
                            component={(props) => (
                                <CreateComment 
                                    history={props.history}/>  
                            )}
                        />
                        <Route exact path='/comments/:commentId'
                            component={(props)=> (
                            <CommentDetail
                                commentId={props.match.params.commentId} 
                                history={props.history}/>
                            )}/>  
                        <Route exact path='/comments/:commentId/edit'>
                            <EditComment />
                        </Route>  
                        <Route>
                            <NoMatchPage />
                        </Route>
                    </Switch>
                </Router>
        );
}}

export default connect()(App);
