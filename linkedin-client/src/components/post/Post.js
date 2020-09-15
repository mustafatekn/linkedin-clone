import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import PostDialog from './PostDialog'
import DeletePost from './DeletePost';
// Redux
import { connect } from 'react-redux';
class Post extends Component {
  
  state={
    isVisible: false
  }

  handleClick = () => {
    this.setState({isVisible: true})
  }
  render() {
    dayjs.extend(relativeTime);

    const {
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;  

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <div className="card w-100 mb-5">
        <div id="generalWrapper clearfix" className="d-inline">
        <div id="pp-wrapper"  className="float-left mt-2 pl-2 clearfix" style={{width:'10%', float:'left'}}>
        <Link to={`/users/${userHandle}`}>
        <img src={userImage} className="img-fluid rounded-circle" style={{width:'3rem', height:'3rem'}} alt="user-profile"/>
        </Link>
        </div>
        
        <div id="userHandleWrapper" className="float-left mt-1 pl-3 clearfix" style={{width:'90%', float:'left'}}>
        <Link to={`/users/${userHandle}`} style={{textDecoration:'none', color:'#333'}}>
        <span className="float-left font-weight-bold">{userHandle}</span>
        </Link>
        </div>

        <div id="timeWrapper w-100" className="text-muted ">
        <small className="pl-2"><span className="px-1">•</span>{dayjs(createdAt).fromNow()}</small>
        </div>
        </div>

        <div className="card-text px-2 mt-2">
            {body}
          </div>

        

        <div className="px-2 mt-2">
        <i className="far fa-thumbs-up"/><span className="pl-1">{likeCount}</span>
        <i className="far fa-comment" style={{paddingLeft:'0.3rem'}}/><span className="pl-1">{commentCount}</span>
        </div>

        <hr className="mt-3 mb-2 mx-auto"style={{width:'90%'}}/>
        <div className="buttons my-1 pl-1">
          <LikeButton postId={postId}/>
          <button type="button" onClick={this.handleClick} className="text-primary p-1" style={{border:'none', background:'transparent'}}>
          <i className="far fa-comment" style={{paddingLeft:'0.3rem'}}/><span className="text-muted pl-1">Yorum Yap</span>
          </button>
          {deleteButton}
          <span className="float-right">
          <PostDialog 
          postId={postId}
          userHandle={userHandle}
          openDialog={this.props.openDialog}
          />
          </span>
          
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Post);