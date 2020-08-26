import {
    RECEIVE_CATEGORIES,
    UPDATE_CATEGORY,
} from '../actions/categories';

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            action.categories.map((category) => (category['posts'] = []));
            return { ...action.categories };
        case UPDATE_CATEGORY:
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    // check if already exist
                    posts: state[action.index]['posts'].concat(action.post),
                },
            };
        default:
            return state;
    }
}
