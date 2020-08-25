import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertUnix } from './PostDetail';
import { handleDeletePost, handlePostVote } from '../actions/shared';

export const deletePost = (e, dispatch) => {
    e.preventDefault();
    const result = window.confirm(
        `Are you sure you want to delete the post ${e.target.name}?`
    );
    result && dispatch(handleDeletePost(e.target.id));
};

export const editPost = (e, dispatch) => {
    console.log('editing', e.target.id);
};

export const votePost = (e, dispatch) => {
    dispatch(handlePostVote(e.target.id, e.target.name))
};

class PostList extends Component {
    state = {
        selectedOption: '',
    };
    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };
    sortByDate = (posts) => {
        console.log(posts.sort((a, b) => b.timestamp - a.timestamp));
    };
    sortByScore = (posts) => {
        console.log(posts.sort((a, b) => b.voteScore - a.voteScore));
    };
    sorting = (state) => {
        return (
            <div>
                <h3>Sort by:</h3>
                <form>
                    <label>Date</label>
                    <input
                        type="radio"
                        name="date"
                        value="date"
                        checked={this.state.selectedOption === 'date'}
                        onChange={(e) => this.handleOptionChange(e)}
                    ></input>
                    <label>Score</label>
                    <input
                        type="radio"
                        name="score"
                        value="score"
                        checked={this.state.selectedOption === 'score'}
                        onChange={(e) => this.handleOptionChange(e)}
                    ></input>
                </form>
            </div>
        );
    };
    handleSorting = (posts) => {
        switch (this.state.selectedOption) {
            case 'date':
                this.sortByDate(posts);
                break;
            case 'score':
                this.sortByScore(posts);
                break;
            default:
                console.log('no sort');
        }
    };

    render() {
        const { posts, dispatch } = this.props;
        let loading = Object.values(posts).length === 0;

        return (
            <div>
                <h2>Posts</h2>
                {this.sorting()}
                {this.handleSorting(posts)}
                {!loading &&
                    posts.map((post) => (
                        !post.deleted &&
                        <li key={post.id}>
                            {post.category}
                            <br />
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            <br />
                            {post.body}
                            <br />
                            by {post.author}
                            <br />
                            at {convertUnix(post.timestamp)}
                            <br />
                            {Math.abs(post.voteScore) > 1
                                ? `${post.voteScore} votes`
                                : `${post.voteScore} vote`}
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
                            <button>
                                <Link to={`/posts/${post.id}/edit`}>
                                    Edit
                                </Link>
                            </button>
                            {' '}
                            <br />
                            <button
                                id={`${post.id}`}
                                name={`${post.title}`}
                                onClick={(e) =>
                                    deletePost(e, this.props.dispatch)
                                }
                            >
                                Delete
                            </button>{' '}
                            <br />
                        </li>
                    ))}
            </div>
        );
    }
}
function mapStateToProps({ posts, dispatch }) {
    return {
        posts,
        dispatch,
    };
}
export default connect(mapStateToProps)(PostList);
