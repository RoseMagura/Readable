import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlePosting } from '../actions/shared';

class CreatePost extends Component {
    state = {
        author: '',
        body: '',
        category: '',
        title: '',
        toHome: false,
    }
// TODO: FIX THIS ISSUE WITH CALLING THE FUNCTION
//    generateUID () {
//         return Math.random().toString(36).substring(2, 15) 
//         + Math.random().toString(36).substring(2, 15)
//     }
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
                Title:
                <input 
                    name='title'
                    type='text' 
                    value={this.state.title} 
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
                Category:
                {/* use a loop to list categories? */}
                <select 
                    name = 'category' 
                    defaultValue={'Pick a category'}
                    onChange={this.handleChange} >
                    <option value='Pick a category'>Pick a category</option>
                    <option value='react'>React</option>
                    <option value='redux'>Redux</option>
                    <option value='udacity'>Udacity</option>
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
        const { author, title, body, category } = this.state;
        const { dispatch } = this.props;
        const timestamp = Date.now();
        // generate unique ID
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        dispatch(handlePosting(id, timestamp, title, body, author, category))
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h1>CreatePost</h1>
                {this.makeForm()}
            </div>
        )
    }
}

export default connect()(CreatePost)