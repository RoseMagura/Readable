import {
    RECEIVE_COMMENTS,
    GET_COMMENT_INFO,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    CREATE_COMMENT,
    VOTE_ON_COMMENT,
} from '../actions/comments';

export default function comments(state = [], action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments
        case GET_COMMENT_INFO:
            return action.comment;
        case CREATE_COMMENT:
            return state.concat(action.comment);
            // TODO: edit and vote
        case EDIT_COMMENT:
            return state;
        case REMOVE_COMMENT:
            return state.filter(comment => comment.id !== action.id);
        case VOTE_ON_COMMENT:
            return state;
        default:
            return state;
    }
}
