import {
    RECEIVE_COMMENTS,
    GET_COMMENT_INFO,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    CREATE_COMMENT,
    VOTE_ON_COMMENT,
} from '../actions/comments';

export default function comments(state = {}, action, commentDict = {}) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            // commentDict[action.comments[0].parentId] = action.comments;
            // return commentDict;
            return action.comments
        case GET_COMMENT_INFO:
            return action.comment;
        case CREATE_COMMENT:
            console.log(state)
            return state.concat(action.comment);
        case EDIT_COMMENT:
            return state;
        case REMOVE_COMMENT:
            return state;
        case VOTE_ON_COMMENT:
            return state;
        default:
            return state;
    }
}
