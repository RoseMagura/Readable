const api = 'http://localhost:3001';
const token = 'mySecret';

const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
};

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then((res) => res.json())
        .then((data) => data.categories);

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers }).then((res) => res.json());
// .then(data => data.posts)

export const getAllComments = () =>
    fetch(`${api}/comments`, { headers }).then((res) => res.json());

export const getCategoryPosts = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then((res) => res.json())
        .then((data) => data);

export const postNewPost = (id, timestamp, title, body, author, category) =>
    fetch(`http://localhost:3001/posts`, {
        method: 'POST',
        body: JSON.stringify({
            id,
            timestamp,
            title,
            body,
            author,
            category,
        }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const getPostDetails = (id) =>
    fetch(`${api}/post/${id}`, { headers }).then((res) => res.json());

export const voteForPost = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const putPost = (id, title, body) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body,
        }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const getCommentsForPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then((res) => res.json())
        .then((data) => data);

export const postComment = (id, timestamp, body, author, parentId) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            id,
            timestamp,
            body,
            author,
            parentId,
        }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const getCommentDetails = (id) =>
    fetch(`${api}/comments/${id}`, { headers }).then((res) => res.json());

export const voteForComment = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const editComment = (id, timestamp, body) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            timestamp,
            body,
        }),
        headers,
    })
        .then((res) => res.json())
        .then((data) => data);

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: { headers },
    }).then((res) => res.json());
