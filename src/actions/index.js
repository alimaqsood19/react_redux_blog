export const FETCH_POSTS = 'fetch_posts';
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