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
        const { posts } = this.props
        let loading = Object.values(posts).length === 0
        // console.log('posts', posts)
        // console.log('loading?', loading)

        return (
            <div>
            <h2>Posts</h2>
            {!loading && Object.values(posts).map((post) => 
            (<li key={post.id}>
                {post.category}<br/>
                <Link to={`/posts/${post.id}`}>{post.title}</Link><br/>
                {post.body}<br/>
                by {post.author}<br/>
                at {convertUnix(post.timestamp)}<br/>
                {Math.abs(post.voteScore) > 1 ? `${post.voteScore} votes` : `${post.voteScore} vote`}
                <button>Upvote</button>
                <button>Downvote</button> <br/>
                {post.commentCount} comments <br/>
                <button>Edit</button> <br/>
                <button 
                    id={`${post.id}`}
                    onClick={(e) => this.deletePost(e)
                    }>Delete</button> <br/>
            </li>))
            }
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