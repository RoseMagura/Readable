import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetCatgoryInfo } from '../actions/shared';
import { convertUnix, displayComments } from './PostDetail';
import { deletePost, editPost, votePost } from './PostList';
import { Link } from 'react-router-dom';

export const findIndex = (categoryId) => {
    let index;
        switch(categoryId){
            case 'react':
                return index = 0;
            case 'redux':
                return index = 1;
            case 'udacity':
                return index = 2;
            default:
                return index = 0
        }
    }

class Category extends Component {
    componentDidMount() {
        const { categoryId, dispatch } = this.props;
        const index = findIndex(categoryId);
        dispatch(handleGetCatgoryInfo(index, categoryId))
    }
    linkToNewPost = () => {
        this.props.history.push('/posts/create');
    };
    renderSwitch(param) {
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
                                <button
                                    id={`${post.id}`}
                                    name={`${post.title}`}
                                    onClick={(e) => {
                                        editPost(e, this.props.dispatch);
                                    }}
                                >
                                    Edit
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
        const { categoryId, categories, comments } = this.props;
        const index = findIndex(categoryId)
        let loading = categories[index].posts === undefined;
        // console.log('loading', loading)
        const formattedTitle =
            categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        let totalComments = 0;
        !loading
                && categories[index].posts.map(
                    (p) => (totalComments += p.commentCount))
            
        return (
            <div>
                <h3>{formattedTitle}</h3>
                <div>
                    <h4>Posts</h4>
                    {!loading && this.renderSwitch(categories[index].posts)}
                </div>
                <div>
                    <button type="button" onClick={this.linkToNewPost}>
                        New Post
                    </button>
                </div>
                <div>
                    <h4>Comments</h4>
                    {totalComments === 0 && (
                        <div>
                            <h5>No Comments</h5>
                            <Link to={`/comments/create`}>
                                <button>Add a Comment</button></Link>
                        </div>
                    )}
                    <div>
                        {!loading && comments.length > 0 && (
                            <ul>
                                {displayComments(comments, this.props.dispatch)
                                }
                                {totalComments !== 0 && (
                                    <Link to={`/comments/create`}><button>Add a Comment</button></Link>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ categories, comments, dispatch }) {
    return {
        categories,
        comments,
        dispatch,
        // loading: categories.posts.length === undefined,
    };
}
export default connect(mapStateToProps)(Category);
