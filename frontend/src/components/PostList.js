import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllPosts, handleGetComments } from '../actions/shared';
import { Link } from 'react-router-dom';
import { convertUnix } from './PostDetail';

class PostList extends Component {
    render() {
        let loading = this.props.posts.length === undefined
        const { posts } = this.props

        return (
            <div>
            <h2>Posts</h2>
            {!loading && posts.map((post) => (<li key={post.id}>
                {post.category}<br/>
                <Link to={`/posts/${post.id}`}>{post.title}</Link><br/>
                {post.body}<br/>
                by {post.author}<br/>
                at {convertUnix(post.timestamp)}<br/>
                {post.voteScore} votes
                <button>Upvote</button>
                <button>Downvote</button> <br/>
                {post.commentCount} comments <br/>
                <button>Edit</button> <br/>
                <button>Delete</button> <br/>
            </li>))}
            </div>
        )
    }
}
function mapStateToProps ({ posts, dispatch }) {
    return {
        posts,
        dispatch
    }
}
export default connect(mapStateToProps)(PostList)