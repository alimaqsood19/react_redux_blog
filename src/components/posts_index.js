import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router-dom'; //Renders a navigation link that allows user to click to navigate around to diff
//pages to render different components within your react Routers
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
                    <Link to={`/posts/${post.id}`}> 
                    {post.title}
                    </Link>
                    {/*Wrapping the post.title in Link basically makes it like an anchor tag link, when clicking on the
                    title will then redirect to the http get request of /posts/:id where it will render the post for us*/}
                </li>
            );
        });
    }
    
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                    {/*This is similar to an anchor tag, expect instead of grabbing a new html doc and since we
                    are using react router, the 'to' is the route that the user is redirected to, in where the
                    specified components under that router will be rendered*/}
                        Add a Post
                    </Link>
                </div>
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