import { RECEIVE_CATEGORIES, RECEIVE_POSTS_FOR_CATEGORY } from '../actions/categories';

export default function categories (state = {}, action){
    switch (action.type) {
        case RECEIVE_CATEGORIES :   
            return {...action.categories}
        case RECEIVE_POSTS_FOR_CATEGORY :
            // let index = 0;
            return {
                ...state,
                [action.index]: {
                    ...state[action.index],
                    posts: [...action.posts],}
                
            }
        default:
            return state
    }
}