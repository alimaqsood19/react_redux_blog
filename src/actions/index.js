export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
import axios from 'axios';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=ali123'

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request //request is a promise, so the redux promise middleware will resolve this promise, the resolved
        //data is what will be passed to the reducer
    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values) //object being passed to axios post req, title, content, categories
        .then(() => {
            return callback();
        });
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => {
        callback(); //once the delete request finishes we will redirect user back to '/'
    });

    return {
        type: DELETE_POST,
        payload: id //just passing the post ID to reducer 
    }
}