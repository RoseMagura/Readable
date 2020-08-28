import {
    RECEIVE_CATEGORIES,
    UPDATE_CATEGORY,
    ADD_POSTS_TO_CATEGORY
} from '../actions/types';

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            action.categories.map((category) => (category['posts'] = []));
            return { ...action.categories };
        case ADD_POSTS_TO_CATEGORY:
            return state
        case UPDATE_CATEGORY:
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    // check if already exists
                    posts: state[action.index]['posts'].concat(action.post),
                },
            };
        default:
            return state;
    }
}
