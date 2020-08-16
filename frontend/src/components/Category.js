import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetComments } from '../actions/shared';
import { convertUnix } from './PostDetail';

class Category extends Component {
    componentDidMount() {
        const { loading } = this.props;
        !loading &&
            this.props.posts.map((p) =>
                this.props.dispatch(handleGetComments(p.id))
            );
    }
    linkToNewPost = () => {
        this.props.history.push('/posts/create');
    };
    render() {
        const { categoryId, posts, comments } = this.props;
        const formattedTitle =
            categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        let topicPosts = [];
        posts.length !== undefined &&
            posts.map(
                (post) => post.category === categoryId && topicPosts.push(post)
            );
        return (
            <div>
                <h3>{formattedTitle}</h3>
                <div>
                    <h4>Posts</h4>
                    {topicPosts.length === 0 ? (
                        <h5>No Posts</h5>
                    ) : (
                        topicPosts.map((post) => (
                            <li key={post.id}>
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
                                <button>Upvote</button>
                                <button>Downvote</button> <br />
                                {post.commentCount} comments <br />
                                <button>Edit</button> <br />
                                <button>Delete</button> <br />
                            </li>
                        ))
                    )}
                </div>
                <div>
                    <button type="button" onClick={this.linkToNewPost}>
                        New Post
                    </button>
                </div>
                <div>
                    <h4>Comments</h4>
                    {topicPosts.length !== 0 && this.props.commentsLoading ? (
                        <h5>No Comments</h5>
                    ) : (
                        topicPosts.map((post) =>
                            post.commentCount > 0 ? (
                                comments[`${post.id}`] !== undefined &&
                                comments[`${post.id}`].map((comment) => (
                                    <li key={comment.id}>
                                        {comment.author} <br />
                                        responding to '{post.title}'<br />
                                        at {convertUnix(comment.timestamp)}
                                        <br />
                                        {comment.body}
                                        <br />
                                        {comment.voteScore} votes
                                        <button>Upvote</button>
                                        <button>Downvote</button> <br />
                                        <button>Edit</button> <br />
                                        <button>Delete</button> <br />
                                    </li>
                                ))
                            ) : (
                                <h5 key={post.id}>No Comments</h5>
                            )
                        )
                    )}
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
        commentsLoading: Object.values(comments).length === undefined,
    };
}
export default connect(mapStateToProps)(Category);
