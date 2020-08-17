import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import { connect } from 'react-redux';

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
                {/* should root include comments? Maybe not? */}
                {/* <CommentList /> */}
                <button type='button' onClick={this.linkToNewPost}>
                    New Post
                </button>
            </div>
        )
    }
}
function mapStateToProps ({ posts, categories, dispatch }) {
    return {
        posts,
        categories,
        dispatch,
        loading: posts.length === undefined,
    }
}
export default connect(mapStateToProps)(Homepage)