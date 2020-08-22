import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCommenting } from '../actions/shared';
import { generateUID } from './CreatePost';

class CreateComment extends Component {
    state = {
        author: '',
        body: '',
        category: '',
        parentId: '',
    }
    // componentDidMount () {
        
    // }
    makeForm () {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
                Username:
                <input 
                    name='author' 
                    type='text' 
                    value={this.state.author} 
                    onChange={this.handleChange} />
            </label><br/>
            <label>
                Body:
                <textarea 
                    name='body'
                    value={this.state.body} 
                    onChange={this.handleChange}/>
            </label><br/>
            <label>
                Responding To:
                {/* use a loop to list posts and have selected if applicable*/}
                <select 
                    name = 'parentId' 
                    defaultValue={'Pick a post'}
                    onChange={this.handleChange} >
                    <option value='Pick a post'>Pick a post</option>
                    {this.props.posts.length !== undefined && this.props.posts.map((post) => 
                        <option value={post.id} key={post.id}>
                            {post.title}</option>)}
                </select>
            </label><br/>
            <input type='submit' value='Submit' />
          </form>
        )
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { author, body, parentId } = this.state;
        const { dispatch } = this.props;
        const timestamp = Date.now();
        // generate unique ID
        const id = generateUID()
        dispatch(handleCommenting(id, timestamp, body, author, parentId))
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h1>Create Comment</h1>
                {this.makeForm()}
            </div>
        )
    }
}

function mapStateToProps({ posts, dispatch, }) {
    return {
        posts,
        dispatch,
        loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(CreateComment)