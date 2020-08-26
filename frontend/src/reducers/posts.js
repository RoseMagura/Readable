import {
    RECEIVE_ALL_POSTS,
    ADD_POST,
    REMOVE_POST,
    VOTE_ON_POST,
    EDIT_POST,
    UPDATE_POST,
} from '../actions/posts';

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return [...action.posts];
        case ADD_POST:
            return [...state.concat(action.post)];
        case REMOVE_POST:
            let updated = [];
            state.map((post) =>
                post.id === action.edited.id
                    ? updated.push(action.edited)
                    : updated.push(post)
            );
            return updated;
        case VOTE_ON_POST:
            let newState = [];
            state.map((post) =>
                post.id === action.updatedPost.id
                    ? newState.push(action.updatedPost)
                    : newState.push(post)
            );
            return newState;
        case EDIT_POST:
            let after = [];
            state.map((post) =>
                post.id === action.post.id
                    ? after.push(action.post)
                    : after.push(post)
            );
            return after;
        case UPDATE_POST:
            let newArray = [];
            let toEdit = [];
            state.map((post) =>
                post.id === action.id ? toEdit.push(post) : newArray.push(post)
            );
            action.value === 'increase'
                ? toEdit[0].commentCount++
                : toEdit[0].commentCount--;
            return newArray.concat(toEdit);
        default:
            return state;
    }
}
