import React, { Component } from 'react';
import { handleGetCategories } from '../actions/shared';
import { connect } from 'react-redux';

class CategoryList extends Component {
    componentDidMount () {
        this.props.dispatch(handleGetCategories());
    }
    render() {
        return (
            <h2>CategoryList</h2>
        )
    }
}

export default connect()(CategoryList)