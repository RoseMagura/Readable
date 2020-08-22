import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetComments, handleDeleteComment } from '../actions/shared';
import { deletePost, editPost, votePost } from './PostList';
import { Link } from 'react-router-dom';

export const deleteComment = (e, dispatch) => {
    e.preventDefault();
    const result = window.confirm(
        `Are you sure you want to delete the comment ${e.target.name}?`
    );
    console.log('from delete comment', e.target.parentid)
    // result && dispatch(handleDeleteComment(e.target.id));
};

export const displayComments = (comments, dispatch) =>
    comments.map((comment) => (
        <li key={comment.id}>
            {comment.author} <br />
            {/* responding to '{post.title}'<br /> */}
            at {convertUnix(comment.timestamp)}
            <br />
            <Link to={`/comments/${comment.id}`}>{comment.body}</Link>
            <br />
            {comment.voteScore} votes
            <button>Upvote</button>
            <button>Downvote</button> <br />
            <button>Edit</button> <br />
            <button
                id={`${comment.id}`}
                name={`${comment.body}`}
                parentid={`${comment.parentId}`}
                onClick={(e) => {
                    deleteComment(e, dispatch);
                }}
            >
                Delete
            </button>{' '}
            <br />
        </li>
    ));

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
        const { posts, comments, postId, history } = this.props;
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
                        <button
                            id={`${post.id}`}
                            name={`${post.title}`}
                            onClick={(e) => {
                                editPost(e, this.props.dispatch);
                            }}
                        >
                            Edit
                        </button>{' '}
                        <br />
                        <button
                            id={`${post.id}`}
                            name={`${post.title}`}
                            onClick={(e) => {
                                deletePost(e, this.props.dispatch);
                                history.push('/');
                            }}
                        >
                            Delete
                        </button>{' '}
                        <br />
                        <h2>Comments</h2>
                        {post.commentCount > 0 ? (
                            <ul>
                                {comments.length !== undefined &&
                                    displayComments(
                                        comments,
                                        this.props.dispatch
                                    )}
                                {/* add a button to add comment after looping 
                            through comments */}
                                <Link to={'/comments/create'}>
                                    <button>Add a Comment</button>
                                </Link>
                            </ul>
                        ) : (
                            <div>
                                <h5 key={post.id}>No Comments</h5>
                                <Link to={'/comments/create'}>
                                    <button>Add a Comment</button>
                                </Link>
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
