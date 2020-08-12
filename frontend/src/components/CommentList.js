import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        return (
            <div>
                <h3>CommentList</h3>
                <Comment />
            </div>
        )
    }
}

export default CommentList