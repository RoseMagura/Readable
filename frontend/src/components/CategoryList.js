import React, { Component } from 'react';
// import { handleGetCategories } from '../actions/shared';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
    render() {
        const { categories } = this.props
        let loading = Object.keys(categories).length === undefined
        return (
            <div>
            <h2>Categories</h2>
            {
                !loading && Object.values(categories).map((category) => 
                <li key={category.name}>
                    <Link to={{
                        pathname: `/category/${category.path}`
                        }}>
                        {category.name}
                    </Link>
                </li>
                )
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