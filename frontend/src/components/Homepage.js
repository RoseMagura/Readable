import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import CommentList from './CommentList';

class Homepage extends Component {
    linkToNewPost = () => {
        alert('new post')
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <CategoryList/>
                <PostList />
                <CommentList />
                <button onClick={this.linkToNewPost}>New Post</button>
            </div>
        )
    }
}

export default Homepage