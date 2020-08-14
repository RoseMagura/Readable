import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllPosts, handleGetComments } from '../actions/shared';

class PostList extends Component {
    convertUnix = (timestamp) => {
        return timestamp * 1000
    }
    componentDidMount () {
        this.props.dispatch(handleGetAllPosts())
    }
    render() {
        let loading = this.props.posts.length === undefined
        const { posts } = this.props
        !loading && posts.map((post) => 
            this.props.dispatch(handleGetComments(post.id))
            )
 
        return (
            <div>
            <h2>Posts</h2>
            {!loading && posts.map((post) => (<li key={post.id}>
                {post.category}<br/>
                {post.title}<br/>
                {post.body}<br/>
                by {post.author}<br/>
                at {this.convertUnix(post.timestamp)}<br/>
                {post.voteScore} votes
                <button>Upvote</button>
                <button>Downvote</button> <br/>
                {post.commentCount} comments
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