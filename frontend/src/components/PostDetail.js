import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCommentVote, handleDeleteComment } from '../actions/shared';
import { deletePost, votePost } from './PostList';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Button from '@material-ui/core/Button';

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
};

export const displayComments = (comments, dispatch) =>
    comments.map(
        (comment) =>
            !comment.deleted && (
                <li key={comment.id}>
                    {comment.author} <br />
                    at {convertUnix(comment.timestamp)}
                    <br />
                    <Link to={`/comments/${comment.id}`}>{comment.body}</Link>
                    <br />
                    {Math.abs(comment.voteScore) > 1
                        ? `${comment.voteScore} votes`
                        : `${comment.voteScore} vote`}
                    <Button
                        style={{ margin: '10px' }}
                        variant="contained"
                        color="primary"
                        id={`${comment.id}`}
                        name="upVote"
                        onClick={(e) => {
                            voteForComment(e, dispatch);
                        }}
                    >
                        Upvote
                    </Button>
                    <Button
                        style={{ margin: '10px' }}
                        variant="contained"
                        color="primary"
                        id={`${comment.id}`}
                        name="downVote"
                        onClick={(e) => {
                            voteForComment(e, dispatch);
                        }}
                    >
                        Downvote
                    </Button>{' '}
                    <br />
                    <Link to={`/comments/${comment.id}/edit`}>
                        <Button
                            style={{ margin: '10px' }}
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    </Link>{' '}
                    <br />
                    <Button
                        style={{ margin: '10px' }}
                        variant="contained"
                        color="primary"
                        id={`${comment.id}`}
                        name={`${comment.body}`}
                        onClick={(e) => {
                            deleteComment(e, dispatch, comment.parentId);
                        }}
                    >
                        Delete
                    </Button>{' '}
                    <br />
                </li>
            )
    );

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
        let postComments = [];
        Object.values(comments).length !== undefined &&
            Object.values(comments).map(
                (comment) =>
                    comment.parentId === postId && postComments.push(comment)
            );

        return (
            <div>
                <Nav />
                {post === undefined ? (
                    <h4>404 Page Not Found</h4>
                ) : (
                    <div>
                        <h1>Post Details</h1>
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
                        <Button
                            style={{ margin: '10px' }}
                            variant="contained"
                            color="primary"
                            id={`${post.id}`}
                            name="upVote"
                            onClick={(e) => {
                                votePost(e, dispatch);
                            }}
                        >
                            Upvote
                        </Button>
                        <Button
                            style={{ margin: '10px' }}
                            variant="contained"
                            color="primary"
                            id={`${post.id}`}
                            name="downVote"
                            onClick={(e) => {
                                votePost(e, dispatch);
                            }}
                        >
                            Downvote
                        </Button>{' '}
                        <br />
                        {Math.abs(post.commentCount) !== 1
                            ? `${post.commentCount} comments`
                            : `${post.commentCount} comment`}{' '}
                        <br />
                        <Link to={`/posts/${postId}/edit`}>
                            <Button
                                style={{ margin: '10px' }}
                                variant="contained"
                                color="primary"
                                id={`${post.id}`}
                                name={`${post.title}`}
                            >
                                Edit
                            </Button>
                        </Link>{' '}
                        <br />
                        <Button
                            style={{ margin: '10px' }}
                            variant="contained"
                            color="primary"
                            id={`${post.id}`}
                            name={`${post.title}`}
                            onClick={(e) => {
                                deletePost(e, this.props.dispatch);
                                history.push('/');
                            }}
                        >
                            Delete
                        </Button>{' '}
                        <br />
                        <h2>Comments</h2>
                        {post.commentCount > 0 ? (
                            <ul>
                                {displayComments(
                                    postComments,
                                    this.props.dispatch
                                )}
                                {/* add a button to add comment after looping 
                            through comments */}
                                <Link to={'/comments/create'}>
                                    <Button
                                        style={{ margin: '10px' }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add a Comment
                                    </Button>
                                </Link>
                            </ul>
                        ) : (
                            <div>
                                <h5 key={post.id}>No Comments</h5>
                                <Link to={'/comments/create'}>
                                    <Button
                                        style={{ margin: '10px' }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add a Comment
                                    </Button>
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
