import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {

 constructor(props) {
  super(props);
  this.state = {
   displaySocialInputs: false,
   handle: '',
   company: '',
   website: '',
   location: '',
   status: '',
   skills: '',
   github_username: '',
   bio: '',
   twitter: '',
   facebook: '',
   linkedin: '',
   youtube: '',
   instagram: '',
   errors: {}
  }

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
 }

 componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
   this.setState({
    errors: nextProps.errors
   });
  }
 }

 onSubmit(e) {
  e.preventDefault();

  const profileData = {
   handle: this.state.handle,
   company: this.state.company,
   website: this.state.website,
   location: this.state.location,
   status: this.state.status,
   skills: this.state.skills,
   github_username: this.state.github_username,
   bio: this.state.bio,
   twitter: this.state.twitter,
   facebook: this.state.facebook,
   linkedin: this.state.linkedin,
   youtube: this.state.youtube,
   instagram: this.state.instagram
  }

  this.props.createProfile(profileData, this.props.history);
 }

 onChange(e) {
  this.setState({
   [e.target.name]: e.target.value
  });
 }

 render() {
  const { errors, displaySocialInputs } = this.state;

  let socialInputs;

  if (displaySocialInputs) {
   socialInputs = (
    <div>
     <InputGroup
      placeholder="Twitter Profile URL"
      name="twitter"
      icon="fab fa-twitter"
      value={this.state.twitter}
      onChange={this.onChange}
      error={errors.twitter}
     >
     </InputGroup>

     <InputGroup
      placeholder="Facebook Page URL"
      name="facebook"
      icon="fab fa-facebook"
      value={this.state.facebook}
      onChange={this.onChange}
      error={errors.facebook}
     >
     </InputGroup>

     <InputGroup
      placeholder="Linkedin Profile URL"
      name="linkedin"
      icon="fab fa-linkedin"
      value={this.state.linkedin}
      onChange={this.onChange}
      error={errors.linkedin}
     >
     </InputGroup>

     <InputGroup
      placeholder="Youtube Channel URL"
      name="youtube"
      icon="fab fa-youtube"
      value={this.state.youtube}
      onChange={this.onChange}
      error={errors.youtube}
     >
     </InputGroup>

     <InputGroup
      placeholder="Instagram Page URL"
      name="instagram"
      icon="fab fa-instagram"
      value={this.state.instagram}
      onChange={this.onChange}
      error={errors.instagram}
     >
     </InputGroup>
    </div>
   );
  }
  // select options for status
  const options = [
   { label: '* Select professional status', value: 0 },
   { label: 'Developer', value: 'Developer' },
   { label: 'Junior Developer', value: 'Junior Developer' },
   { label: 'Senior Developer', value: 'Senior Developer' },
   { label: 'Junior Tester', value: 'Junior Tester' },
   { label: 'Senior Tester', value: 'Senior Tester' },
   { label: 'Automation Tester', value: 'Automation Tester' },
   { label: 'Manager', value: 'Manager' },
   { label: 'Student or Learning', value: 'Student or Learning' },
   { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
   { label: 'Intern', value: 'Intern' },
   { label: 'Other', value: 'Other' },
  ];

  return (
   <div className="create-profile">
    <div className="container">
     <div className="row">
      <div className="col-md-8 m-auto">
       <h1 className="display-4 text-center">
        Create your profile
       </h1>
       <p className="lead text-center">
        Let's get some information to make your profile stand out
       </p>
       <small className="d-block pb-3">
        * = required fields
       </small>
       <form onSubmit={this.onSubmit}>
        <TextFieldGroup
         placeholder="* Profile handle"
         name="handle"
         value={this.state.handle}
         onChange={this.onChange}
         error={errors.handle}
         info="A unique handle for your profile URL. Your full name, company name, nickname"
        >
        </TextFieldGroup>
        <SelectListGroup
         placeholder="Status"
         name="status"
         value={this.state.status}
         onChange={this.onChange}
         options={options}
         error={errors.status}
         info="Give us an idea of where you are at in your career"
        >
        </SelectListGroup>

        <TextFieldGroup
         placeholder="Company"
         name="company"
         value={this.state.company}
         onChange={this.onChange}
         error={errors.company}
         info="Could be your own company or one you work for"
        >
        </TextFieldGroup>

        <TextFieldGroup
         placeholder="Website"
         name="website"
         value={this.state.website}
         onChange={this.onChange}
         error={errors.website}
         info="Could be your own or a company website"
        >
        </TextFieldGroup>

        <TextFieldGroup
         placeholder="Location"
         name="location"
         value={this.state.location}
         onChange={this.onChange}
         error={errors.location}
         info="City & state suggested (eg. Boston, MA)"
        >
        </TextFieldGroup>

        <TextFieldGroup
         placeholder="* Skills"
         name="skills"
         value={this.state.skills}
         onChange={this.onChange}
         error={errors.skills}
         info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
        >
        </TextFieldGroup>

        <TextFieldGroup
         placeholder="Github Username"
         name="github_username"
         value={this.state.github_username}
         onChange={this.onChange}
         error={errors.github_username}
         info="If you want your latest repos and a Github link, include your username"
        >
        </TextFieldGroup>

        <TextAreaFieldGroup
         placeholder="Short Bio"
         name="bio"
         value={this.state.bio}
         onChange={this.onChange}
         error={errors.bio}
         info="Tell us a little about yourself"
        >
        </TextAreaFieldGroup>

        <div className="mb-3">
         <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
           this.setState((prevState) => {
            return {
             displaySocialInputs: !prevState.displaySocialInputs
            }
           });
          }}>
          Add Social Network Links
         </button>
         <span className="text-muted ml-3 small">Optional</span>
        </div>
        {socialInputs}
        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>
       </form>
      </div>
     </div>
    </div>
   </div>
  )
 }
}

CreateProfile.propTypes = {
 createProfile: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
 return {
  profile: state.profile,
  errors: state.errors
 }
}

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));