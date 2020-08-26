import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEditPost } from '../actions/shared';

class EditPost extends Component {
    state = {
        body: '',
        title: '',
    };
    makeForm(post) {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    New Title:
                    <input
                        name="title"
                        type="text"
                        style={{ width: '300px' }}
                        placeholder={post.title}
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    New Body:
                    <textarea
                        name="body"
                        placeholder={post.body}
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
        const { title, body } = this.state;
        const { postId, history, dispatch } = this.props;
        dispatch(handleEditPost(postId, title, body));
        history.push('/');
    };
    render() {
        const { postId, posts, loading } = this.props;
        let postArray = [];
        !loading && posts.map((p) => p.id === postId && postArray.push(p));
        const post = postArray[0];
        return (
            <div>
                <h1>EditPost</h1>
                {this.makeForm(post)}
            </div>
        );
    }
}

function mapStateToProps({ posts, dispatch }) {
    return {
        posts,
        dispatch,
        loading: posts.length === undefined,
    };
}

export default connect(mapStateToProps)(EditPost);
