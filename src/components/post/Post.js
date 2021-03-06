import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {

 componentWillMount() {
  this.props.getPost(this.props.match.params.id);
 }

 render() {

  const { post, postLoading } = this.props.post;
  let postContent;

  if (post === null || postLoading || Object.keys(post).length === 0) {
   postContent = <Spinner></Spinner>
  } else {
   postContent = (
    <div>
     <PostItem post={post} showActions={false}></PostItem>
     <CommentForm postId={post._id}></CommentForm>
     <CommentFeed postId={post._id} comments={post.comments}></CommentFeed>
    </div>
   );
  }

  return (
   <div className="post">
    <div className="container">
     <div className="row">
      <div className="col-md-12">
       <Link to="/feed" className="btn btn-dark mb-3">
        Back To Feed
       </Link>
       {postContent}
      </div>
     </div>
    </div>
   </div>
  )
 }
}

Post.propTypes = {
 getPost: PropTypes.func.isRequired,
 post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
 post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);