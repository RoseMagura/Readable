const api = 'http://localhost:3001/'
const token = 'mySecret'

const headers = { 
    'Accept': 'application/json',
    'Authorization': token 
}

export const getAllCategories = () => 
    fetch(`${api}/categories`, { headers })
    // is it already json?
    .then(res => res.json())
    // is this part necessary? maybe not
    //.then(data => console.log(data))
    .then(data => data.categories)

export const getAllPosts = () => 
    fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    // .then(data => data.post)

export const getCategoryPosts = (category) => 
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const postNewPost = (id, timestamp, title, body, author, category) =>
    await fetch(`${api}/posts`, {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify({
            // do these need quotes?
            'id': id, 
            'timestamp': timestamp,
            'title': title,
            'body': body,
            'author': author,
            'category': category})
    }).then(res => res.json())

export const getPostDetails = (id) => 
    fetch(`${api}/post/${id}`, { headers })
    .then(res => res.json())

export const voteForPost = (option) => 
    await fetch(`${api}/posts`, {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify({'option': option})})
        .then(res => res.json())

export const editPost = (id, title, body, category, timestamp) =>
    await fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: { headers },
        body: JSON.stringify({
            'id': id,
            'title': title,
            'timestamp': timestamp, 
            'body': body,
            'author': author,
            'category': category,
            'deleted': false,
            'commentCount': 0 // reset to zero for new version?
        })})
        .then(res => res.json())

export const deletePost = (id) =>
    await fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: { headers }})
        .then(res => res.json())

export const getCommentsForPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const postComment = (id, timestamp, body, author, parentId)
    await fetch(`${api}/comments`, {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify({
            'id': id,
            'timestamp': timestamp,
            'body': body,
            'author': author,
            'parentId': parentId
        })})
        .then(res => res.json())

export const getCommentDetails = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

export const voteForComment= (id, option) => 
    await fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify({'option': option})})
        .then(res => res.json())

export const editComment= (id, author, timestamp, body) =>
    // get parentId and votescore
    fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json()).then(
        // set parentId = res.parentId
        // voteScore = res.voteScore
    ).then(
    await fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: { headers },
        body: JSON.stringify({
            'id': id,
            // parentId: ?
            'timestamp': timestamp, 
            'body': body,
            'author': author,
            //'votescore': 
            'deleted': false,
            'parentDeleted': false    
        })})
        .then(res => res.json()))

export const deleteComment = (id) =>
    await fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: { headers }})
        .then(res => res.json())