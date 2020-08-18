import { 
    RECEIVE_ALL_POSTS, 
    ADD_POST, 
    REMOVE_POST 
} from '../actions/posts';

export default function posts (state = {}, action){
    switch (action.type) {
        case RECEIVE_ALL_POSTS :
            // return [...action.posts.filter((post) => post.id !== undefined)]
            return [...action.posts]
        case ADD_POST :
            return [...state.concat(action.post)] 
        case REMOVE_POST :
            // return Object.values(state).filter((post) => post.id !== undefined)
            return Object.values(state).filter((post) => post.id !== action.id)
        default:
            return state
    }
}