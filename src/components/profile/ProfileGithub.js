import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getGithubRepos } from '../../actions/profileActions';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';

class ProfileGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      reposLoading: false,
      errors: {}
    }
  }

  componentDidMount() {
    const { username } = this.props;
    this.props.getGithubRepos(username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.reposLoading) {
      if (this.refs.myRef) {
        this.setState({
          reposLoading: nextProps.profile.reposLoading
        });
      }
    }

    if (nextProps.profile.repos) {
      if (this.refs.myRef) {
        this.setState({
          repos: nextProps.profile.repos
        });
      }
    }
  }

  render() {
    const { repos } = this.state;
    const { reposLoading } = this.state;
    // const { errors } = this.state;

    let repoItems;
    // if (repos.length === 0 && errors) {
    //   repoItems =
    //     <div className="row">
    //       <div className="col-md-6">
    //         <h4 className="text-danger">
    //           Error while fetching github repos
    //         </h4>
    //       </div>
    //     </div>
    // } else
    if (repos.length === 0 && reposLoading) {
      repoItems = <Spinner></Spinner>
    } else {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    }

    return (
      <div ref="myRef">
        <hr></hr>
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
// export default ProfileGithub;
