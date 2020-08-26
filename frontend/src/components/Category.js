import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertUnix, displayComments } from './PostDetail';
import { deletePost, votePost } from './PostList';
import { Link } from 'react-router-dom';

class Category extends Component {
    renderSwitch(param, categoryId) {
        switch (param.length) {
            case 0:
                return <h5>No Posts</h5>;
            default:
                return (
                    <div>
                        {param.map((post) => (
                            <li key={post.id}>
                                {post.category}
                                <br />
                                <Link to={`/${categoryId}/${post.id}`}>
                                    {post.title}
                                </Link>
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
                                        votePost(e, this.props.dispatch);
                                    }}
                                >
                                    Upvote
                                </button>
                                <button
                                    id={`${post.id}`}
                                    name="downVote"
                                    onClick={(e) => {
                                        votePost(e, this.props.dispatch);
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
                                </button>{' '}
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
    render() {
        const { categoryId, posts, comments, loading } = this.props;
        let topicPosts = [];
        const formattedTitle =
            categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        let totalComments = 0;
        !loading &&
            posts.map((p) => p.category === categoryId && topicPosts.push(p));
        topicPosts.map((post) => (totalComments += post.commentCount));
        let topicComments = [];
        Object.values(comments).length !== undefined &&
            topicPosts.length > 0 &&
            Object.values(comments).map(
                (comment) =>
                    topicPosts[0].id === comment.parentId &&
                    topicComments.push(comment)
            );
        return (
            <div>
                <h3>{formattedTitle}</h3>
                <div>
                    <h4>Posts</h4>
                    {!loading && this.renderSwitch(topicPosts, categoryId)}
                </div>
                <div>
                    <button>
                        <Link to="/posts/create">New Post</Link>
                    </button>
                </div>
                <div>
                    <h4>Comments</h4>
                    {totalComments === 0 && (
                        <div>
                            <h5>No Comments</h5>
                            <Link to={`/comments/create`}>
                                <button>Add a Comment</button>
                            </Link>
                        </div>
                    )}
                    <div>
                        <ul>
                            {!loading &&
                                topicComments.length > 0 &&
                                displayComments(
                                    topicComments,
                                    this.props.dispatch
                                )}
                            {totalComments !== 0 && (
                                <Link to={`/comments/create`}>
                                    <button>Add a Comment</button>
                                </Link>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts, comments, dispatch }) {
    return {
        posts,
        comments,
        dispatch,
        loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(Category);
