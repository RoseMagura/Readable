import React, { Component } from 'react';
import PostList from './PostList';
import { connect } from 'react-redux';
import Nav from './Nav';

class Homepage extends Component {
    render() {
        return (
            <div className='container'>
                <Nav/>
                <h1>Homepage</h1>
                <PostList />
            </div>
        );
    }
}
function mapStateToProps({ posts, categories, dispatch }) {
    return {
        posts,
        categories,
        dispatch,
        loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(Homepage);
