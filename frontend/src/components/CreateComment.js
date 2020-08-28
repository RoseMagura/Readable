import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCommenting } from '../actions/shared';
import { generateUID } from './CreatePost';
import Nav from './Nav';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class CreateComment extends Component {
    state = {
        author: '',
        body: '',
        category: '',
        parentId: '',
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
                    Body:
                    <textarea
                        name="body"
                        value={this.state.body}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Responding To:
                    <Select
                        style={{ margin: '10px' }}
                        name="parentId"
                        defaultValue='DEFAULT'
                        onChange={this.handleChange}
                    >
                        <MenuItem value="DEFAULT">Pick a post</MenuItem>
                        {this.props.posts.length !== undefined &&
                            this.props.posts.map(
                                (post) =>
                                    !post.deleted && (
                                        <MenuItem value={post.id} key={post.id}>
                                            {post.title}
                                        </MenuItem>
                                    )
                            )}
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
        const { author, body, parentId } = this.state;
        const { dispatch } = this.props;
        const timestamp = Date.now();
        // generate unique ID
        const id = generateUID();
        dispatch(handleCommenting(id, timestamp, body, author, parentId));
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <Nav />
                <h1>Create Comment</h1>
                {this.makeForm()}
            </div>
        );
    }
}

function mapStateToProps({ posts, dispatch }) {
    return {
        posts,
        dispatch,
        loading: posts.length === undefined,
    };
}
export default connect(mapStateToProps)(CreateComment);
