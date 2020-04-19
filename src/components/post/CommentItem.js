import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

 constructor(props) {
  super(props);
  this.onDeleteClick = this.onDeleteClick.bind(this);
 }

 onDeleteClick() {
  const { comment, postId } = this.props;
  this.props.deleteComment(postId, comment._id);
 }

 render() {

  const { comment, auth } = this.props;

  return (
   // <div className="container">
   <div className="card card-body mb-3">
    <div className="row">
     <div className="col-md-2">
      {/* <Link to={`/profile/`}> */}
      <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
      {/* </Link> */}
      <br />
      <p className="text-center">{comment.name}</p>
     </div>
     <div className="col-md-10">
      <span className="lead">{comment.text}</span>
      <div className="text-right">
       {comment.user === auth.user.id ? (
        <button onClick={this.onDeleteClick} className="btn btn-danger mr-1" type="button">
         <i className="fas fa-times"></i>
        </button>
       ) : null}
      </div>
     </div>
    </div>
   </div>
   // </div>
  )
 }
}

CommentItem.propTypes = {
 auth: PropTypes.object.isRequired,
 comment: PropTypes.object.isRequired,
 postId: PropTypes.string.isRequired,
 deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
 auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);