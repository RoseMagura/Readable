import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertUnix, displayComments } from './PostDetail';
import { deletePost, votePost } from './PostList';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Button from '@material-ui/core/Button';

class Category extends Component {
    renderSwitch(param, categoryId) {
        switch (param.length) {
            case 0:
                return <h5>No Posts</h5>;
            default:
                return (
                    <div>
                        {param.map(
                            (post) =>
                                !post.deleted && (
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
                                        <Button
                                            style={{ margin: '10px' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => {
                                                votePost(
                                                    e,
                                                    post.id,
                                                    'upVote',
                                                    this.props.dispatch
                                                );
                                            }}
                                        >
                                            Upvote
                                        </Button>
                                        <Button
                                            style={{ margin: '10px' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => {
                                                votePost(
                                                    e,
                                                    post.id,
                                                    'downVote',
                                                    this.props.dispatch
                                                );
                                            }}
                                        >
                                            Downvote
                                        </Button>{' '}
                                        <br />
                                        {post.commentCount} comments <br />
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
                                            onClick={(e) =>
                                                deletePost(
                                                    e,
                                                    post.id,
                                                    post.title,
                                                    this.props.dispatch
                                                )
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
                <Nav />
                <h3>{formattedTitle}</h3>
                <div>
                    <h4>Posts</h4>
                    {!loading && this.renderSwitch(topicPosts, categoryId)}
                </div>
                <div>
                    <h4>Comments</h4>
                    {totalComments === 0 && (
                        <div>
                            <h5>No Comments</h5>
                            <Link to={`/comments/create`}>
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
                                    <Button
                                        style={{ margin: '10px' }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add a Comment
                                    </Button>
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
