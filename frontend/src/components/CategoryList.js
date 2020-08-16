import React, { Component } from 'react';
import { handleGetCategories } from '../actions/shared';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
    render() {
        let loading = this.props.categories.length === undefined
        const { categories } = this.props
        return (
            <div>
            <h2>Categories</h2>
            {
                !loading && categories.map((category) => 
                <li key={category.name}>
                    <Link to={{
                        pathname: `/category/${category.path}`
                        }}>
                        {category.name}
                    </Link>
                </li>)
            }
            </div>
        )
    }
}

function mapStateToProps ({ categories, dispatch }) {
    return {
        categories,
        dispatch
    }
}
export default connect(mapStateToProps)(CategoryList)