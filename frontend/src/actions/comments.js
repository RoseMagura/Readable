export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';

export function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments,
    };
}

export function createComment(id, timestamp, body, author, parentId) {
    return {
        type: CREATE_COMMENT,
        id,
        timestamp,
        body,
        author,
        parentId,
    };
}

//or just needs timestamp and body?
export function editComment (id, timestamp, body, author, parentId) {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body,
        author,
        parentId,
    };
}

export function removeComment(id) {
    return {
        type: REMOVE_COMMENT,
        id,
    };
}

export function voteOnComment (id, option) {
    return {
        type: VOTE_ON_COMMENT,
        // might not need id?
        id,
        option
    }
}