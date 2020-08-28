import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertUnix } from './PostDetail';
import { handleDeletePost, handlePostVote } from '../actions/shared';
import Button from '@material-ui/core/Button';

export const deletePost = (e, dispatch) => {
    e.preventDefault();
    const result = window.confirm(
        `Are you sure you want to delete the post ${e.target.name}?`
    );
    result && dispatch(handleDeletePost(e.target.id));
};

export const votePost = (e, dispatch) => {
    dispatch(handlePostVote(e.target.id, e.target.name));
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
    sorting = () => {
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
                    <label>None</label>
                    <input
                        type="radio"
                        name="none"
                        value="none"
                        checked={this.state.selectedOption === ''}
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
                return '';
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
                    posts.map(
                        (post) =>
                            !post.deleted && (
                                <li key={post.id}>
                                    {post.category}
                                    <br />
                                    <Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
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
                                    <Link to={`/posts/${post.id}/edit`}>
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
                                        id={`${post.id}`}
                                        name={`${post.title}`}
                                        onClick={(e) =>
                                            deletePost(e, this.props.dispatch)
                                        }
                                    >
                                        Delete
                                    </Button>{' '}
                                    <br />
                                </li>
                            )
                    )}
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
