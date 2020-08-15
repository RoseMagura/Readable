import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
// import CommentList from './CommentList';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { handleGetComments, handleGetAllPosts, handleGetCategories } from '../actions/shared';

class Homepage extends Component {
    componentDidMount () {
        this.props.dispatch(handleGetCategories());
        this.props.dispatch(handleGetAllPosts())
        // const { loading } = this.props
        // console.log(loading)
        // !loading && console.log(this.props.posts.length)
        // let postArray = [] 
        // !loading && this.props.posts.map((p) => 
        //     p.id === this.props.postId && postArray.push(p))
        // const post = postArray[0]
        // !loading &&  
        //     this.props.dispatch(handleGetComments(post.id))
            
    }
    linkToNewPost = () => {
        this.props.history.push('/posts/create');
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <CategoryList/>
                <PostList />
                {/* should root include comments? Maybe not?s */}
                {/* <CommentList /> */}
                <button type='button' onClick={this.linkToNewPost}>
                    New Post
                </button>
            </div>
        )
    }
}
function mapStateToProps ({ posts, categories, dispatch }) {
    return {
        posts,
        categories,
        dispatch,
        loading: posts.length === undefined
    }
}
export default connect(mapStateToProps)(Homepage)