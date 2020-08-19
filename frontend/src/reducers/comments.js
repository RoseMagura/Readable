import {
    RECEIVE_COMMENTS,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    CREATE_COMMENT,
    VOTE_ON_COMMENT,
} from '../actions/comments';

export default function comments(state = {}, action, commentDict = {}) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            commentDict[action.comments[0].parentId] = action.comments;
            return commentDict;
        case CREATE_COMMENT:
            return state;
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
