import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { 
    getAllCategories,
    getAllPosts,
    getCommentsForPost
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
                // console.log('res', res)
                res.length > 0 
                    && dispatch(receiveComments(res))
            })
    }
}