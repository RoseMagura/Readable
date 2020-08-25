export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const GET_COMMENT_INFO = 'GET_COMMENT_INFO';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';

export function receiveAllComments (comments) {
    return{
        type: RECEIVE_ALL_COMMENTS,
        comments
    }
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

export function createComment(
    comment
) {
    return {
        type: CREATE_COMMENT,
        comment
    };
}

export function editComment(editedComment) {
    return {
        type: EDIT_COMMENT,
        editedComment
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
        updatedComment
    };
}
