import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetComments } from '../actions/shared';
import { convertUnix } from './PostDetail';

class Category extends Component {
    // state = {
    //     buttonExists: false
    // }
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
        const { categoryId, posts, comments, loading } = this.props;
        console.log('posts', posts);
        const formattedTitle =
            categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        let topicPosts = [];
        posts.length !== undefined &&
            posts.map(
                (post) => post.category === categoryId && topicPosts.push(post)
            );
        let totalComments = 0;
        topicPosts.map((p) => (totalComments += p.commentCount));
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
                    {totalComments === 0 && 
                    (
                        <div>
                            <h5>No Comments</h5>
                            <button id='add'>Add a Comment</button> <br />
                        </div>
                    )
                     }
                    <div>
                        {!loading && topicPosts.length !== 0 && (
                            <ul>
                                {topicPosts.map(
                                    (post) =>
                                        post.commentCount > 0 &&
                                        comments[`${post.id}`] !== undefined &&
                                        comments[`${post.id}`].map(
                                            (comment) => (
                                                // console.log(comment)
                                                <li key={comment.id}>
                                                    {comment.author} <br />
                                                    responding to '{post.title}'
                                                    <br />
                                                    at{' '}
                                                    {convertUnix(
                                                        comment.timestamp
                                                    )}
                                                    <br />
                                                    {comment.body}
                                                    <br />
                                                    {comment.voteScore} votes
                                                    <button>Upvote</button>
                                                    <button>
                                                        Downvote
                                                    </button>{' '}
                                                    <br />
                                                    <button>Edit</button> <br />
                                                    <button>Delete</button>{' '}
                                                    <br />
                                                </li>
                                            )
                                        )
                                )}
                                {/* add a button to add comment after looping 
                            through comments */}
                                {totalComments!== 0 && 
                                <button>Add a Comment</button>}
                            </ul>
                        )}
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
