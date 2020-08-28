import React, { Component } from 'react';
import { deleteComment, convertUnix } from './PostDetail';
import { connect } from 'react-redux';
import Nav from './Nav';
import { handleGetCommentInfo } from '../actions/shared';
import Button from '@material-ui/core/Button';

class CommentDetail extends Component {
    componentDidMount() {
        const { commentId, dispatch } = this.props;
        dispatch(handleGetCommentInfo(commentId));
    }
    render() {
        const { comments } = this.props;
        return (
            <div>
                <Nav />
                <h1>Comment Details</h1>
                {comments.author} <br />
                at {convertUnix(comments.timestamp)}
                <br />
                {comments.body}
                <br />
                {comments.voteScore} votes
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '10px' }}
                >
                    Upvote
                </Button>
                <Button variant="contained" color="primary">
                    Downvote
                </Button>{' '}
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '10px' }}
                >
                    Edit
                </Button>{' '}
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    id={`${comments.id}`}
                    name={`${comments.body}`}
                    onClick={(e) => {
                        deleteComment(e, this.props.dispatch);
                        this.props.history.push('/');
                    }}
                >
                    Delete
                </Button>{' '}
                <br />
            </div>
        );
    }
}
function mapStateToProps({ comments, dispatch }) {
    return {
        comments,
        dispatch,
    };
}
export default connect(mapStateToProps)(CommentDetail);
