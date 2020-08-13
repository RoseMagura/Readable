import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import CommentList from './CommentList';
import { withRouter } from 'react-router';

class Homepage extends Component {
    linkToNewPost = () => {
        this.props.history.push('/posts/create');
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <CategoryList/>
                <PostList />
                <CommentList />
                <button type='button' onClick={this.linkToNewPost}>
                    New Post
                </button>
                {/* {PostButton()} */}
            </div>
        )
    }
}

export default withRouter(Homepage)