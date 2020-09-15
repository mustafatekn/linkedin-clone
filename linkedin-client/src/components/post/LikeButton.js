import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.postId
      )
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <button type="button" tip="Like" className="text-primary p-1" style={{border:'none', background:'transparent'}}>
        <i className="far fa-thumbs-up"/><span className="text-muted pl-1">Beğen</span>
        </button>
      </Link>
    ) : this.likedPost() ? (
        <button type="button" onClick={this.unlikePost} tip="Like" className="text-primary p-1" style={{border:'none', background:'transparent'}}>
        <i className="fas fa-thumbs-up"/><span className="text-muted pl-1">Beğen</span>
        </button>
    ) : (
        <button type="button" onClick={this.likePost} tip="Like" className="text-muted p-1" style={{border:'none', background:'transparent'}}>
        <i className="far fa-thumbs-up"/><span className="text-muted pl-1">Beğen</span>
        </button>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);