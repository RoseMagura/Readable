import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEditComment } from '../actions/shared';

class EditComment extends Component {
    state = {
        body: '',
    };
    makeForm(comment) {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    New Body:
                    <textarea
                        name="body"
                        placeholder={comment.body}
                        value={this.state.body}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        event.preventDefault();
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { body } = this.state;
        const { commentId, history, dispatch } = this.props;
        const timestamp = Date.now();
        dispatch(handleEditComment(commentId, timestamp, body));
        history.push('/');
    };
    render() {
        const { commentId, comments, loading } = this.props;
        let commentArray = [];
        !loading &&
            Object.keys(comments).map(
                (c) => c === commentId && commentArray.push(comments[c])
            );
        const comment = commentArray[0];
        return (
            <div>
                <h1>Edit Comment</h1>
                {comment !== undefined && this.makeForm(comment)}
            </div>
        );
    }
}

function mapStateToProps({ comments, dispatch }) {
    return {
        comments,
        dispatch,
        loading: Object.values(comments).length === undefined,
    };
}

export default connect(mapStateToProps)(EditComment);
