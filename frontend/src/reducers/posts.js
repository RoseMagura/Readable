import { 
    RECEIVE_ALL_POSTS, 
    ADD_POST, 
    REMOVE_POST,
    VOTE_ON_POST,
    EDIT_POST,
    RECEIVE_POSTS_FOR_CATEGORY
} from '../actions/posts';

export default function posts (state = {}, action){
    switch (action.type) {
        case RECEIVE_ALL_POSTS :
            return [...action.posts]
        case ADD_POST :
            return [...state.concat(action.post)] 
        case REMOVE_POST :
            return Object.values(state).filter((post) => post.id !== action.id)
        case VOTE_ON_POST :
            return state
        case EDIT_POST : 
            return state    
        case RECEIVE_POSTS_FOR_CATEGORY :
            return action.posts
        default:
            return state
    }
}