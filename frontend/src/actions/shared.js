import { receiveCategories } from './categories';
import { receivePosts, addPost, removePost } from './posts';
import { 
    getAllCategories,
    getAllPosts,
    getCommentsForPost, 
    postNewPost,
    deletePost
} from '../API';
import { receiveComments } from './comments';

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