import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetCatgoryInfo } from '../actions/shared';
import { convertUnix, displayComments } from './PostDetail';
import { deletePost, editPost, votePost } from './PostList';
import { Link } from 'react-router-dom';

class Category extends Component {
    componentDidMount() {
        const { categoryId, dispatch } = this.props;
        // is this inefficient?
        switch(categoryId){
            case 'react':
                dispatch(handleGetCatgoryInfo(0, categoryId));
                break;
            case 'redux':
                dispatch(handleGetCatgoryInfo(1, categoryId));
                break;
            case 'udacity':
                dispatch(handleGetCatgoryInfo(2, categoryId));
                break;
            default: 
                return 'no category'
        }
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
        let index = 0;
        switch(categoryId){
            case 'react':
                index = 0;
                break;
            case 'redux':
                index = 1;
                break;
            case 'udacity':
                index = 2;
                break;
            default:
                index = 0
                break;
        }
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
