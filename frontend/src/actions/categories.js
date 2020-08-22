export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS_FOR_CATEGORY = 'RECEIVE_POSTS_FOR_CATEGORY' 

export function receiveCategories (categories) {
    return{
        type: RECEIVE_CATEGORIES,
        categories
    }
}

export function receiveCategoryPosts (index, category, posts) {
    return {
        type: RECEIVE_POSTS_FOR_CATEGORY,
        index,
        category,
        posts
    }
}