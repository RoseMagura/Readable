import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetComments } from '../actions/shared';

class PostDetail extends Component {
    componentDidMount () {
        // console.log(this.props.loading)
        const { loading } = this.props
        let postArray = [] 
        !loading && this.props.posts.map((p) => 
            p.id === this.props.postId && postArray.push(p))
        const post = postArray[0]
        !loading &&  
            this.props.dispatch(handleGetComments(post.id))
            
    }
    convertUnix = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toDateString().split('48')[0];
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();
        const formattedTime = 
            hours + ':' + minutes.substr(-2) + ' on ' + formattedDate;
        return formattedTime;    
    }
    render() {
        // console.log(this.props) 
        const { loading } = this.props
        let postArray = [] 
        !loading && this.props.posts.map((p) => 
            p.id === this.props.postId && postArray.push(p))
        const post = postArray[0]
        const { posts, comments, postId } = this.props   
        return (
            <div>
                <h1>Post Details</h1>
                {post !== undefined &&
                <div>
                {post.category}<br/>
                {post.title}<br/>
                {post.body}<br/>
                by {post.author}<br/>
                at {this.convertUnix(post.timestamp)}<br/>
                {post.voteScore} votes
                <button>Upvote</button>
                <button>Downvote</button> <br/>
                {post.commentCount} comments <br/>
                <button>Edit</button> <br/>
                <button>Delete</button> <br/>

                <h2>Comments</h2>
                {post.commentCount > 0 ? (
                    comments[`${post.id}`] !== undefined &&
                    comments[`${post.id}`].map((comment) => (
                        <li key={comment.id}>
                            {comment.author} <br />
                            responding to '{post.title}'<br />
                            at {this.convertUnix(comment.timestamp)}
                            <br />
                            {comment.body}
                            <br />
                            {comment.voteScore} votes
                            <button>Upvote</button>
                            <button>Downvote</button> <br />
                            <button>Edit</button> <br />
                            <button>Delete</button> <br />
                        </li>
                    ))
                ) : (
                    <h5 key={post.id}>No Comments</h5>
                )}
            </div>
                }

            </div>
        )
    }
}

function mapStateToProps ({ posts, dispatch, comments }) {
    return {
        posts,
        dispatch,
        comments,
        loading: posts.length === undefined
    }
}
export default connect(mapStateToProps)(PostDetail)