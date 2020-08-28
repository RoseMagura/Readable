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
            let reactArray = []
            let reduxArray = []
            let udacityArray = []
            action.posts.map((post) => {switch(post.category){
                case 'react':
                    reactArray.push(post);
                    break;
                case 'redux':
                    reduxArray.push(post);
                    break;
                case 'udacity':
                    udacityArray.push(post);
                    break;
                default: 
                    break;
            }}
            )
            return {
                ...state,
                [0]: {
                    ...state[0],
                    posts: state[0].posts.concat(reactArray)
                },
                [1]: {
                    ...state[1],
                    posts: state[1].posts.concat(reduxArray)
                },
                [2]: {
                    ...state[2],
                    posts: state[2].posts.concat(udacityArray)
                }
            }
        case UPDATE_CATEGORY:
            // console.log()
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    posts: state[action.index]['posts'].concat(action.post),
                },
            };
        default:
            return state;
    }
}
