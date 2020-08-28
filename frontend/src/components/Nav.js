import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryList from './CategoryList';
import AppBar from '@material-ui/core/AppBar';
// import theme from

class Nav extends Component {
    render() {
        return (
            <AppBar position='static' color='secondary'>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/posts/create"
                            exact
                            activeClassName="active"
                        >
                            Add New Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/comments/create"
                            exact
                            activeClassName="active"
                        >
                            Add New Comment
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <CategoryList />
                </div>
            </AppBar>
        );
    }
}

export default Nav;
