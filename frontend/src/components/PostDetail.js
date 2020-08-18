import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetComments } from '../actions/shared';

export const convertUnix = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toDateString();
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const formattedTime =
        hours + ':' + minutes.substr(-2) + ' on ' + formattedDate;
    return formattedTime;
};

class PostDetail extends Component {
    componentDidMount() {
        const loading = this.props.posts.length === undefined;
        let postArray = [];
        !loading &&
            this.props.posts.map(
                (p) => p.id === this.props.postId && postArray.push(p)
            );
        const post = postArray[0];
        !loading && this.props.dispatch(handleGetComments(post.id));
    }
    render() {
        const { posts, comments, postId } = this.props;
        const loading = Object.values(posts).length === undefined;
        let postArray = [];
        !loading &&
            Object.values(posts).map(
                (p) => p.id === postId && postArray.push(p)
            );
        const post = postArray[0];
        return (
            <div>
                <h1>Post Details</h1>
                {post !== undefined && (
                    <div>
                        {post.category}
                        <br />
                        {post.title}
                        <br />
                        {post.body}
                        <br />
                        by {post.author}
                        <br />
                        at {convertUnix(post.timestamp)}
                        <br />
                        {post.voteScore} votes
                        <button>Upvote</button>
                        <button>Downvote</button> <br />
                        {post.commentCount} comments <br />
                        <button>Edit</button> <br />
                        <button>Delete</button> <br />
                        <h2>Comments</h2>
                        {post.commentCount > 0 ? (
                            <ul>
                                {comments[`${post.id}`] !== undefined &&
                                    comments[`${post.id}`].map((comment) => (
                                        <li key={comment.id}>
                                            {comment.author} <br />
                                            responding to '{post.title}'<br />
                                            at {convertUnix(comment.timestamp)}
                                            <br />
                                            {comment.body}
                                            <br />
                                            {comment.voteScore} votes
                                            <button>Upvote</button>
                                            <button>Downvote</button> <br />
                                            <button>Edit</button> <br />
                                            <button>Delete</button> <br />
                                        </li>
                                    ))}
                                {/* add a button to add comment after looping 
                            through comments */}
                                <button>Add a Comment</button>
                            </ul>
                        ) : (
                            <div>
                                <h5 key={post.id}>No Comments</h5>
                                <button>Add a Comment</button> <br />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps({ posts, dispatch, comments }) {
    return {
        posts,
        dispatch,
        comments,
        loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(PostDetail);
