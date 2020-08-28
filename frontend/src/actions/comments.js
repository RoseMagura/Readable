import {
    RECEIVE_COMMENTS,
    RECEIVE_ALL_COMMENTS,
    GET_COMMENT_INFO,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    CREATE_COMMENT,
    VOTE_ON_COMMENT,
} from './types';

export function receiveAllComments(comments) {
    return {
        type: RECEIVE_ALL_COMMENTS,
        comments,
    };
}

export function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments,
    };
}

export function getCommentInfo(comment) {
    return {
        type: GET_COMMENT_INFO,
        comment,
    };
}

export function createComment(comment) {
    return {
        type: CREATE_COMMENT,
        comment,
    };
}

export function editComment(editedComment) {
    return {
        type: EDIT_COMMENT,
        editedComment,
    };
}

export function removeComment(id) {
    return {
        type: REMOVE_COMMENT,
        id,
    };
}

export function voteOnComment(updatedComment) {
    return {
        type: VOTE_ON_COMMENT,
        updatedComment,
    };
}
