import {
    receiveCategories,
    updateCategory,
    addPostsToCategory,
} from './categories';
import {
    receivePosts,
    addPost,
    removePost,
    updatePost,
    editPost,
    voteOnPost,
} from './posts';
import {
    getAllCategories,
    getAllPosts,
    getAllComments,
    getCommentsForPost,
    postNewPost,
    deletePost,
    deleteComment,
    getCommentDetails,
    postComment,
    voteForPost,
    voteForComment,
    putPost,
    putComment,
} from '../API';
import {
    receiveComments,
    receiveAllComments,
    getCommentInfo,
    removeComment,
    createComment,
    voteOnComment,
    editComment,
} from './comments';

export function handleGetCategories() {
    return (dispatch) => {
        return getAllCategories().then((categories) => {
            dispatch(receiveCategories(categories));
        });
    };
}

export function handleGetAllPosts() {
    return (dispatch) => {
        return getAllPosts().then((posts) => {
            dispatch(receivePosts(posts));
            dispatch(addPostsToCategory(posts));
        });
    };
}

export function handleGetComments(post) {
    return (dispatch) => {
        return getCommentsForPost(post).then((res) => {
            res.length > 0 && dispatch(receiveComments(res));
        });
    };
}

export function handlePosting(id, timestamp, title, body, author, category) {
    return async (dispatch) => {
        try {
            const newPost = await postNewPost(
                id,
                timestamp,
                title,
                body,
                author,
                category
            );
            dispatch(addPost(newPost));
        } catch (error) {
            console.log(error);
        }
        return 'done';
    };
}

export function handleUpdateCategory(post, index) {
    return (dispatch) => {
        dispatch(updateCategory(post, index));
    };
}

export function handleCommenting(id, timestamp, body, author, parentId) {
    return async (dispatch) => {
        try {
            const res = await postComment(
                id,
                timestamp,
                body,
                author,
                parentId
            );
            dispatch(createComment(res));
            dispatch(updatePost(parentId, 'increase'));
        } catch (error) {
            console.log(error);
        }
        return 'done';
    };
}

export function handleDeletePost(id) {
    return async (dispatch) => {
        try {
            const res = await deletePost(id);
            dispatch(removePost(res));
        } catch (error) {
            console.log(error);
        }
        return 'done';
    };
}

export function handleDeleteComment(commentId, parentId) {
    return async (dispatch) => {
        try {
            await deleteComment(commentId);
            dispatch(removeComment(commentId));
            dispatch(updatePost(parentId, 'decrease'));
        } catch (error) {
            console.log(error);
        }
        return 'done';
    };
}

export function handleGetCommentInfo(id) {
    return (dispatch) => {
        return getCommentDetails(id).then((res) =>
            dispatch(getCommentInfo(res))
        );
    };
}

export function handleGetAllComments() {
    return (dispatch) => {
        return getAllComments().then((res) =>
            dispatch(receiveAllComments(res))
        );
    };
}

export function handlePostVote(id, option) {
    return (dispatch) => {
        return voteForPost(id, option).then((res) => dispatch(voteOnPost(res)));
    };
}

export function handleCommentVote(id, option) {
    return (dispatch) => {
        return voteForComment(id, option).then((res) =>
            dispatch(voteOnComment(res))
        );
    };
}

export function handleEditPost(id, title, body) {
    return (dispatch) => {
        return putPost(id, title, body).then((res) => dispatch(editPost(res)));
    };
}

export function handleEditComment(id, timestamp, body) {
    return (dispatch) => {
        return putComment(id, timestamp, body).then((res) =>
            dispatch(editComment(res))
        );
    };
}
