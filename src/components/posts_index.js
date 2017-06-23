import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import _ from 'lodash';

class PostIndex extends Component {
    componentDidMount() {//React lifecycle method
        //function called automatically by react once this component first appears in the DOM
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, (post) => { //need to use lodash .map() method to iterate over each object 
            //since its not an array we cant use the array.prototype.map() function
            return (
                <li className="list-group-item" key={post.id} >
                    {post.title}
                </li>
            );
        });
    }
    
    render() {
        return (
            <div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div> 
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts}
    //returning an object called posts whos value is state.posts, state.posts comes from the reducers under combineReducers()
    //state.posts value is the reducer PostsReducer which holds the changed state influenced by the action creator fetchPosts()
    //Then the component will have access to this.props.posts, since posts was attached to the prop object through connect()
}

export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostIndex)
//we are using mapStateToProps to map state to props, {fetchPosts} is the action creator we want to have available on the
//component as this.props.fetchPosts however, instead of using mapDispatchToProps we just added the action creator
//as an object directly to connect() and it will do it for us