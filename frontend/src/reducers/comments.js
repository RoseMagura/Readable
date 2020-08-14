import { RECEIVE_COMMENTS } from '../actions/comments';

export default function comments(state = {}, action, commentDict = {}) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            commentDict[action.comments[0].parentId] = action.comments;
            return commentDict;
        default:
            return state;
    }
}
