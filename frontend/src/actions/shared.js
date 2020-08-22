import { 
    receiveCategories, 
    receiveCategoryPosts,
    updateCategory } from './categories';
import { receivePosts, addPost, removePost,  deleteCommentFromPost } from './posts';
import { 
    getAllCategories,
    getAllPosts,
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
    getCommentInfo, 
    removeComment,
    createComment } from './comments';
import { findIndex } from '../components/Category';

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
            const voteScore = resArray[0];
            const deleted = resArray[1];
            const commentCount = resArray[2];
            dispatch(addPost(id, timestamp, title, body, author, 
                category, voteScore, deleted, commentCount ))
            //update this part with index
            let index = findIndex(category)
            dispatch(updateCategory(id, timestamp, title, body, author, 
                category, voteScore, deleted, commentCount, index ))
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
            const resArray = Object.values(res)
            const voteScore = resArray[0];
            const deleted = resArray[1];
            const parentDeleted = resArray[2];
            dispatch(createComment(id, timestamp, body, author, 
               voteScore, deleted, parentDeleted, parentId ))
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
            dispatch(deleteCommentFromPost(parentId))}
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