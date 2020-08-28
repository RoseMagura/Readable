import {
    RECEIVE_COMMENTS,
    RECEIVE_ALL_COMMENTS,
    GET_COMMENT_INFO,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    CREATE_COMMENT,
    VOTE_ON_COMMENT,
} from '../actions/types';

export default function comments(state = [], action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_ALL_COMMENTS:
            return action.comments;
        case GET_COMMENT_INFO:
            return action.comment;
        case CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: { ...action.comment },
            };
        case EDIT_COMMENT:
            return {
                ...state,
                [action.editedComment.id]: {
                    ...action.editedComment,
                },
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: true,
                },
            };
        case VOTE_ON_COMMENT:
            return {
                ...state,
                [action.updatedComment.id]: { ...action.updatedComment },
            };
        default:
            return state;
    }
}
