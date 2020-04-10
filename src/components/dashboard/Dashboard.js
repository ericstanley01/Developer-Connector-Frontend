import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

 componentDidMount() {
  this.props.getCurrentProfile();
 }

 onDeleteClick(e) {
  if (window.confirm('Are you sure? This cannot be undone!')) {
   this.props.deleteAccount();
  }
 }

 render() {
  const { user } = this.props.auth;
  const { profile } = this.props.profile;
  const { loading } = this.props.loading;

  let dashboardContent;

  if (profile === null || loading) {
   dashboardContent = <Spinner></Spinner>;
  } else {
   // check if logged in user has profile data
   if (Object.keys(profile).length > 0) {
    dashboardContent = (
     <div>
      <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
      <ProfileActions></ProfileActions>
      <Experience experience={profile.experience}></Experience>
      <Education education={profile.education}></Education>
      <div style={{ marginBottom: '60px' }}>
       <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>Delete My Account</button>
      </div>
     </div>
    )
   } else {
    // user is logged in but has no profile
    dashboardContent = (
     <div>
      <p className="lead text-muted">Welcome {user.name}</p>
      <p>You have not yet setup a profile. Please add some info</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">
       Create Profile
      </Link>
     </div>
    );
   }
  }
  return (
   <div className="dashboard">
    <div className="container">
     <div className="row">
      <div className="col-md-12">
       <h1 className="display-4">Dashboard</h1>
       {dashboardContent}
      </div>
     </div>
    </div>
   </div>
  )
 }
}

Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired,
 deleteAccount: PropTypes.func.isRequired,
 loading: PropTypes.object.isRequired
}

const mapStateToProps = state => {
 return {
  profile: state.profile,
  auth: state.auth,
  loading: state.loading
 }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);