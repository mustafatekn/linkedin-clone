import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import Navbar from '../components/layout/Navbar';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import Logo from '../images/logo.jpg'
class user extends Component {
  state = {
    profile: null,
    postIdParam: null
  };

  componentDidMount = async () => {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  

  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;


    const postsMarkup = loading ? (
      <div></div>
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    return (
      <div>
        <Navbar/>
        <div className="container clearfix">
          <div className="row">
            <div className="col-8">
            <div className="mb-5">
          {this.state.profile === null ? (
              <div></div>
            ) : (
              <Profile profile={this.state.profile} />
            )}
          </div>
          <div> 
                {postsMarkup}
          </div>

            </div>
            <div className="col-4">
            <div>
          <h3>Önerilen Kullanıcılar</h3>
          <div className="suggested-user clearfix">
            <div className="suggested-user-pp">
              <a href="/">
                <img className="suggested-user-pp-link" src={Logo} alt="logo"/>
              </a>
            </div>
            <div className="suggested-user-info">
              <div className="suggested-user-item">
                <a className="suggested-name f-700" href="/">Name</a>
                <a className="suggested-surname f-700" href="/">Surname</a>
              </div>
              <div className="sugested-user-item">
                <div className="suggested-user-username f-700">
                  <a className="suggested-username" href="/">@namesurname</a>
                </div>
              </div>
            </div>
          </div>

          <div className="suggested-user clearfix">
            <div className="suggested-user-pp">
              <a href="/">
                <img className="suggested-user-pp-link" src={Logo} alt="logo"/>
              </a>
            </div>
            <div className="suggested-user-info">
              <div className="suggested-user-item">
                <a className="suggested-name f-700" href="/">Name</a>
                <a className="suggested-surname f-700" href="/">Surname</a>
              </div>
              <div className="sugested-user-item">
                <div className="suggested-user-username f-700">
                  <a className="suggested-username" href="/">@namesurname</a>
                </div>
              </div>
            </div>
          </div>

          <div className="suggested-user clearfix">
            <div className="suggested-user-pp">
              <a href="/">
                <img className="suggested-user-pp-link" src={Logo} alt="logo"/>
              </a>
            </div>
            <div className="suggested-user-info">
              <div className="suggested-user-item">
                <a className="suggested-name f-700" href="/">Name</a>
                <a className="suggested-surname f-700" href="/">Surname</a>
              </div>
              <div className="sugested-user-item">
                <div className="suggested-user-username f-700">
                  <a className="suggested-username" href="/">@namesurname</a>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        
        
      </div>
      </div>
      
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
  UI: state.UI,
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);