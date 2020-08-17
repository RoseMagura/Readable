import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertUnix } from './PostDetail';
import { handleDeletePost } from '../actions/shared';

class PostList extends Component {
    deletePost = (e) => {
        e.preventDefault()
        console.log('DELETING', e.target.id)
        this.props.dispatch(handleDeletePost(e.target.id))
    }
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
                <button 
                    id={`${post.id}`}
                    onClick={(e) => this.deletePost(e)
                    }>Delete</button> <br/>
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