import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {

 componentDidMount() {
  if (this.props.match.params.handle) {
   this.props.getProfileByHandle(this.props.match.params.handle);
  }
 }

 componentWillReceiveProps(nextProps) {
  if (nextProps.profile.profile === null && this.props.loading) {
   this.props.history.push('/not-found');
  }
 }

 render() {

  const { profile } = this.props.profile;
  const { loading } = this.props.loading;

  let profileContent;

  if (profile === null || loading) {
   profileContent = <Spinner></Spinner>
  } else {
   profileContent = (
    <div>
     <div className="row">
      <div className="col-md-6">
       <Link to="/profiles" className="btn btn-light mb-3 float-left">
        Back To Profiles
       </Link>
      </div>
      <div className="col-md-6"></div>
     </div>
     <ProfileHeader profile={profile}></ProfileHeader>
     <ProfileAbout profile={profile}></ProfileAbout>
     <ProfileCreds education={profile.education} experience={profile.experience}></ProfileCreds>
     {profile.github_username ? (<ProfileGithub username={profile.github_username}></ProfileGithub>) : null}
    </div>
   )
  }


  return (
   <div className="profile">
    <div className="container">
     <div className="row">
      <div className="col-md-12">
       {profileContent}
      </div>
     </div>
    </div>
   </div>
  )
 }
}

Profile.propTypes = {
 getProfileByHandle: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired,
 loading: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
 profile: state.profile,
 loading: state.loading
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);