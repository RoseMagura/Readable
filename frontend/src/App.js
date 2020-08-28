import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import CreateComment from './components/CreateComment';
import EditComment from './components/EditComment';
import Category from './components/Category';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    handleGetAllPosts,
    handleGetCategories,
    handleGetAllComments,
} from './actions/shared';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme/muiTheme';

const NoMatchPage = () => {
    return <h3>404 - Not found</h3>;
};

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleGetCategories());
        this.props.dispatch(handleGetAllPosts());
        this.props.dispatch(handleGetAllComments());
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={(props) => (
                                <Homepage history={props.history} />
                            )}
                        />
                        <Route
                            exact
                            path="/:categoryId"
                            component={(props) => (
                                <Category
                                    categoryId={props.match.params.categoryId}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route exact path="/posts">
                            <PostList />
                        </Route>
                        <Route
                            exact
                            path="/posts/create"
                            component={(props) => (
                                <CreatePost history={props.history} />
                            )}
                        />
                        <Route
                            exact
                            path="/posts/:postId/edit"
                            component={(props) => (
                                <EditPost
                                    postId={props.match.params.postId}
                                    posts={props.posts}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/comments/create"
                            component={(props) => (
                                <CreateComment history={props.history} />
                            )}
                        />
                        <Route
                            exact
                            path="/comments/:commentId/edit"
                            component={(props) => (
                                <EditComment
                                    commentId={props.match.params.commentId}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={['/posts/:postId', '/:categoryId/:postId']}
                            component={(props) => (
                                <PostDetail
                                    postId={props.match.params.postId}
                                    posts={props.posts}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route>
                            <NoMatchPage />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

export default connect()(App);
