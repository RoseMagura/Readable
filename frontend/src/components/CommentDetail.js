import React, { Component } from 'react';
import { deleteComment, convertUnix } from './PostDetail'; 
import { connect } from 'react-redux';
import {handleGetCommentInfo} from '../actions/shared';

class CommentDetail extends Component {
    componentDidMount() {
        const { commentId, dispatch } = this.props;
        dispatch(handleGetCommentInfo(commentId));
    }
    render() {
        const { comments } = this.props
        return (
            <div>
                <h1>Comment Details</h1>
            {comments.author} <br />
            at {convertUnix(comments.timestamp)}
            <br />
            {comments.body}
            <br />
            {comments.voteScore} votes
            <button>Upvote</button>
            <button>Downvote</button> <br />
            <button>Edit</button> <br />
            <button
                id={`${comments.id}`}
                name={`${comments.body}`}
                onClick={(e) => {
                    deleteComment(
                        e,
                        this.props.dispatch
                    );
                    this.props.history.push('/');
                }}
            >
                Delete
            </button>{' '}
            <br />
        </div>
        )
    }
}
function mapStateToProps({ comments, dispatch }) {
    return {
        comments,
        dispatch,
        // loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(CommentDetail)