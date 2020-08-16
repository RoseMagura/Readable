import { RECEIVE_ALL_POSTS, ADD_POST } from '../actions/posts';

export default function posts (state = {}, action){
    switch (action.type) {
        case RECEIVE_ALL_POSTS :
            return action.posts
        case ADD_POST :
            return {
                ...state,
                ...action.post
            }    
        default:
            return state
    }
}