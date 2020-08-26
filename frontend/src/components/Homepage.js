import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css'

class Homepage extends Component {
    render() {
        return (
            <div className='container'>
                <h1>Homepage</h1>
                <CategoryList />
                <PostList />
                <Link to="/posts/create">
                    <button type="button">New Post</button>
                </Link>
                <Link to="/comments/create">
                    <button type="button">New Comment</button>
                </Link>
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
