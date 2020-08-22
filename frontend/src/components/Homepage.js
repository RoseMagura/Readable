import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
// import CommentList from './CommentList';
import { connect } from 'react-redux';
// import { handleGetAllPosts, handleGetCategories } from '../actions/shared';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    componentDidMount () {
        // this.props.dispatch(handleGetCategories());
        // this.props.dispatch(handleGetAllPosts())
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <CategoryList/>
                <PostList />
                <Link to='/posts/create'><button type='button'>
                    New Post
                </button></Link>
                {/* should root include comments? Maybe not? */}
                {/* <CommentList /> */}
                <Link to='/comments/create'><button type='button'>
                    New Comment
                </button></Link>
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