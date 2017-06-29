import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index.js';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST: 
            return _.omit(state, action.payload); //look at the state object, if the state object has a key of post.id, then 
            //omit it from the object and return a new state object where that state id is no longer present
        case FETCH_POST:
            const post = action.payload.data; 
            // console.log(post);
            const newState = {...state };
            // console.log('newState: ', newState);
            newState[post.id] = post;
            // console.log(newState);
            return newState; // this returns the axios get request of the particular post ID as ID: Data object
            //ES6 return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id'); //axios returns a promise then has a .data object with all the data from the http get request
        default:                          //we used _.mapKeys as it pulls a particular field from an object and uses that as the key for that object so its an obj with more objects inside whos keys are ids
            return state;
    }
}