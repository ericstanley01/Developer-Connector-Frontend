import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
// import { getProfileByUserId } from '../../actions/profileActions';

class PostFeed extends Component {

 // constructor(props) {
 //  super(props);

 //  this.state = {
 //   userHandle: ''
 //  }

 // }

 render() {

  const { posts } = this.props;

  return (
   posts.map(post => {
    // const userHandle = this.props.getProfileByUserId(post.user).handle;
    // console.log(userHandle);
    // this.setState({
    //  userHandle: userHandle
    // });

    return (
     // <PostItem key={post._id} post={post} userHandle={userHandle}></PostItem>
     <PostItem key={post._id} post={post}></PostItem>
    )
   })
  )
 }
}

PostFeed.propTypes = {
 // getProfileByUserId: PropTypes.func.isRequired,
 posts: PropTypes.array.isRequired
}

// export default connect(null, { getProfileByUserId })(PostFeed);
export default PostFeed;