export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    };
}

export function updateCategory(
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    commentCount,
    index
) {
    return {
        type: UPDATE_CATEGORY,
        post: {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
            commentCount,
        },
        index,
    };
}
