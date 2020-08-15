import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllPosts, handleGetComments } from '../actions/shared';
import { Link } from 'react-router-dom';

class PostList extends Component {
    convertUnix = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toDateString().split('48')[0];
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();
        const formattedTime = 
            hours + ':' + minutes.substr(-2) + ' on ' + formattedDate;
        return formattedTime;    
    }
    componentDidMount () {
        // this.props.dispatch(handleGetAllPosts())
    }
    render() {
        let loading = this.props.posts.length === undefined
        const { posts } = this.props
        // !loading && posts.map((post) => 
        //     this.props.dispatch(handleGetComments(post.id))
        //     )
 
        return (
            <div>
            <h2>Posts</h2>
            {!loading && posts.map((post) => (<li key={post.id}>
                {post.category}<br/>
                <Link to={`/posts/${post.id}`}>{post.title}</Link><br/>
                {post.body}<br/>
                by {post.author}<br/>
                at {this.convertUnix(post.timestamp)}<br/>
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