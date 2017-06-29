import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index.js';
import {Link} from 'react-router-dom';


class PostsShow extends Component {
    componentDidMount() {
        const id = this.props.match.params.id; //provided directly by react router 
        this.props.fetchPost(id); //same as last time the moment the component gets rendered for the first time it will exec fetchPost
    }
    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const {post} = this.props;

        if (!post) {
            return <div>Loading..</div>
        }
        return (
            <div>
                <div id="post_id_show" className="text-xs-right">
                <Link to='/' className="btn btn-secondary">Back To Index</Link>
                </div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
                <button
                    className="btn btn-danger pull-xs-left"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
            </div>
        );
    }
};

function mapStateToProps({posts}, ownProps) {
    // console.log(ownProps);
    // console.log(ownProps.match.params.id);
    // console.log('posts', posts);
    // console.log(posts[ownProps.match.params.id]);
     //ownProps, is the props that is going to PostsShow, this.props === ownProps
     return {post: posts[ownProps.match.params.id]} //this returns the single post that we want in stead of the whole
     //collection of posts
     //from REDUCER, post will have the title, content, category object fields 
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);