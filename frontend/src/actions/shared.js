import { 
    receiveCategories, 
    receiveCategoryPosts,
} from './categories';
import { 
    receivePosts, 
    addPost, 
    removePost,
    updatePost} from './posts';
import { 
    getAllCategories,
    getAllPosts,
    getAllComments,
    getCommentsForPost, 
    getCategoryPosts,
    postNewPost,
    deletePost,
    deleteComment,
    getCommentDetails,
    postComment
} from '../API';
import { 
    receiveComments, 
    receiveAllComments,
    getCommentInfo, 
    removeComment,
    createComment } from './comments';

export function handleGetCategories () {
    return (dispatch) => {
        return getAllCategories()
            .then((categories) => {
                dispatch(receiveCategories(categories))
            })
    }
}

export function handleGetAllPosts () {
    return (dispatch) => {
        return getAllPosts()
            .then((posts) => {
                dispatch(receivePosts(posts))
            })
    }
}

export function handleGetCatgoryInfo (index, category) {
    return (dispatch) => {
        return getCategoryPosts(category)
            .then((posts) => {
                dispatch(receiveCategoryPosts(index, category, posts))
                posts.map((post) => getCommentsForPost(post.id)
                .then((comments) => {
                    dispatch(receiveComments(comments))
                }))
            })
    }
}

export function handleGetComments (post) {
    return (dispatch) => {
        return getCommentsForPost(post)
            .then((res) => {
                res.length > 0 
                    && dispatch(receiveComments(res))
            })
    }
}

export function handlePosting (id, timestamp, title, body, author, category) {
    return async dispatch => {
        try{
            const res =  await postNewPost(id, timestamp, title, body, author, 
                category)
            const resArray = Object.values(res)
            console.log(resArray)
            const voteScore = resArray[0];
            const deleted = resArray[1];
            const commentCount = resArray[2];
            dispatch(addPost(id, timestamp, title, body, author, 
                category, voteScore, deleted, commentCount ))
        } 
        catch(error) {
            console.log(error);
        }
        return 'done';
}}

export function handleCommenting (id, timestamp, body, author, parentId) {
    return async dispatch => {
        try{
            const res =  await postComment(id, timestamp, body, author, 
                parentId)
            console.log(res)
            dispatch(createComment(res))
            dispatch(updatePost(parentId, 'increase'))
        } 
        catch(error) {
            console.log(error);
        }
        return 'done';
}}


export function handleDeletePost (id) {
    return async dispatch => {
        try {
            await deletePost
            dispatch(removePost(id))}
        catch(error) {
            console.log(error);
        }
        return 'done';
}}

export function handleDeleteComment (commentId, parentId) {
    return async dispatch => {
        try {
            await deleteComment
            dispatch(removeComment(commentId))
            dispatch(updatePost(parentId, 'decrease'))
        }
        catch(error) {
            console.log(error);
        }
        return 'done';
}}

export function handleGetCommentInfo (id) {
    return dispatch => {
        return getCommentDetails(id)
        .then(res => dispatch(getCommentInfo(res)))
    }
}

export function handleGetAllComments () {
    return dispatch => {
        return getAllComments()
        .then(res => 
            dispatch(receiveAllComments(res)))
    }
}