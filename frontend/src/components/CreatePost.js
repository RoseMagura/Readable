import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlePosting, handleUpdateCategory } from '../actions/shared';
import Nav from './Nav';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

export const generateUID = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

class CreatePost extends Component {
    state = {
        author: '',
        body: '',
        category: '',
        title: '',
    };

    makeForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input
                        name="author"
                        type="text"
                        value={this.state.author}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Title:
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Body:
                    <textarea
                        name="body"
                        value={this.state.body}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <Select
                        style={{ margin: '10px' }}
                        name="category"
                        defaultValue={'Pick a category'}
                        onChange={this.handleChange}
                    >
                        <option value="Pick a category">Pick a category</option>
                        <option value="react">React</option>
                        <option value="redux">Redux</option>
                        <option value="udacity">Udacity</option>
                    </Select>
                </label>
                <br />
                <Button
                    onClick={this.handleSubmit}
                    style={{ margin: '10px' }}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        );
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        event.preventDefault();
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { author, title, body, category } = this.state;
        const { dispatch } = this.props;
        const timestamp = Date.now();
        // generate unique ID
        const id = generateUID();
        const newPost = {id, timestamp, title, body, author, category}
        switch(String(category)) {
            case 'react':
                dispatch(handleUpdateCategory(newPost, 0));
                dispatch(handlePosting(id, timestamp, title, body, author, category));
                this.props.history.push('/');
                break;
            case 'redux':
                dispatch(handleUpdateCategory(newPost, 1));
                dispatch(handlePosting(id, timestamp, title, body, author, category));
                this.props.history.push('/');
                break;
            case 'udacity':
                dispatch(handleUpdateCategory(newPost, 2));
                dispatch(handlePosting(id, timestamp, title, body, author, category));
                this.props.history.push('/');
                break;
            default:
                alert('Sorry, that is not a valid category. Try again.')
        }
        
    };
    render() {
        return (
            <div>
                <Nav />
                <h1>Create Post</h1>
                {this.makeForm()}
            </div>
        );
    }
}

export default connect()(CreatePost);
