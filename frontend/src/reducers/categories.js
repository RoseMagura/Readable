import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS_FOR_CATEGORY,
    UPDATE_CATEGORY,
} from '../actions/categories';

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            action.categories.map((category) => (category['posts'] = []));
            return { ...action.categories };
        case RECEIVE_POSTS_FOR_CATEGORY:
            const currentPosts = state[action.index].posts;
            console.log('currentPosts', currentPosts);
            console.log('current posts length', currentPosts.length);
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    //replace posts[0] with a loop at some point
                    posts:
                        currentPosts.length === 0
                            ? state[action.index].posts.concat(...action.posts)
                            : action.posts[0].id !== currentPosts[0].id
                            ? state[action.index].posts.concat(...action.posts)
                            : currentPosts
                },
            };
        case UPDATE_CATEGORY:
            console.log(state[action.index]);
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    // check if already exist
                    posts: state[action.index]['posts'].concat(action.post),
                    // posts: [action.post]
                },
            };
        default:
            return state;
    }
}
