import { 
    RECEIVE_ALL_POSTS, 
    ADD_POST, 
    REMOVE_POST 
} from '../actions/posts';

export default function posts (state = {}, action){
    switch (action.type) {
        case RECEIVE_ALL_POSTS :
            // to get rid of weird post for now
            // return action.posts.filter((post) => post.id !== undefined)
            return action.posts
        case ADD_POST :
            // console.log(action)
            return {
                ...state,
                // .posts,
                ...action.post
            }    
        case REMOVE_POST :
            // console.log('state from remove', state.filter((post) => post.id !== undefined))
            const result = state.filter((post) => post.id !== action.id)
            return result
            // return action.posts.filter((post) => post.id === action.id)
        default:
            return state
    }
}