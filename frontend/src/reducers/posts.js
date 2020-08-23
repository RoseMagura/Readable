import { 
    RECEIVE_ALL_POSTS, 
    ADD_POST, 
    REMOVE_POST,
    VOTE_ON_POST,
    EDIT_POST,
    UPDATE_POST
} from '../actions/posts';

export default function posts (state = {}, action){
    switch (action.type) {
        case RECEIVE_ALL_POSTS :
            return action.posts.filter((post) => post.id !== undefined)
            // return [...action.posts]
        case ADD_POST :
            return [...state.concat(action.post)] 
        case REMOVE_POST :
            return state.filter((post) => post.id !== action.id)
        case VOTE_ON_POST :
            return state
        case EDIT_POST : 
            return state    
        case UPDATE_POST :
            let newArray = [];
            let toEdit = [];
            state.map((post) => 
            {   post.id === action.id 
                ? toEdit.push(post)
                : newArray.push(post);
            }    
            )
            action.value === 'increase' ? toEdit[0].commentCount++
            : toEdit[0].commentCount--;
            return newArray.concat(toEdit)
        default:
            return state
    }
}