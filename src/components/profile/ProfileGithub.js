import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getGithubRepos } from '../../actions/profileActions';
import { connect } from 'react-redux';

class ProfileGithub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
      // clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      // count: 5,
      // sort: 'created: asc',
      repos: [],
      errors: {}
    }
  }

  componentDidMount() {
    const { username } = this.props;
    // console.log('inside componentDidMount method')
    // const { count, sort, clientId, clientSecret } = this.state;
    this.props.getGithubRepos(username);

    // fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (this.refs.myRef) {
    //       this.setState({ repos: data });
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    // console.log('inside componentWillReceiveProps method');
    // console.log(nextProps.errors);
    // console.log(nextProps.profile);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
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

    // console.log(repos);

    const repoItems = repos.map(repo => (
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
