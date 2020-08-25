import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCommentVote, handleDeleteComment } from '../actions/shared';
import { deletePost, votePost } from './PostList';
import { Link } from 'react-router-dom';

export const deleteComment = (e, dispatch, parentId) => {
    e.preventDefault();
    const result = window.confirm(
        `Are you sure you want to delete the comment ${e.target.name}?`
    );
    result && dispatch(handleDeleteComment(e.target.id, parentId));
};

export const voteForComment = (e, dispatch) => {
    e.preventDefault();
    dispatch(handleCommentVote(e.target.id, e.target.name));
}

export const displayComments = (comments, dispatch) =>
    comments.map((comment) => (
        !comment.deleted &&
        <li key={comment.id}>
            {comment.author} <br />
            {/* responding to '{post.title}'<br /> */}
            at {convertUnix(comment.timestamp)}
            <br />
            <Link to={`/comments/${comment.id}`}>{comment.body}</Link>
            <br />
            {comment.voteScore} votes
            <button
             id={`${comment.id}`}
             name='upVote'
             onClick={(e) => {
                 voteForComment(e, dispatch);
             }}>Upvote</button>
            <button id={`${comment.id}`}
             name='downVote'
             onClick={(e) => {
                 voteForComment(e, dispatch);
             }}>Downvote</button> <br />
            <button>
                <Link to={`/comments/${comment.id}/edit`}>
                    Edit
                </Link>
            </button> <br />
            <button
                id={`${comment.id}`}
                name={`${comment.body}`}
                onClick={(e) => {
                    deleteComment(e, dispatch, comment.parentId);
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
    render() {
        const { posts, comments, postId, history, dispatch } = this.props;
        const loading = Object.values(posts).length === undefined;
        let postArray = [];
        !loading &&
            Object.values(posts).map(
                (p) => p.id === postId && postArray.push(p)
            );
        const post = postArray[0];
        let postComments =[];
        Object.values(comments).length !== undefined &&
        Object.values(comments).map((comment) =>
            comment.parentId === postId && postComments.push(comment))

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
                        <button
                                id={`${post.id}`}
                                name="upVote"
                                onClick={(e) => {
                                    votePost(e, dispatch);
                                }}
                            >
                                Upvote
                            </button>
                            <button
                                id={`${post.id}`}
                                name="downVote"
                                onClick={(e) => {
                                    votePost(e, dispatch);
                                }}
                            >
                                Downvote
                            </button>{' '}
                            <br />
                        {post.commentCount} comments <br />
                        <button
                            id={`${post.id}`}
                            name={`${post.title}`}
                        ><Link to={`/posts/${postId}/edit`}>
                            Edit</Link>
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
                                {
                                    displayComments(
                                        postComments,
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
