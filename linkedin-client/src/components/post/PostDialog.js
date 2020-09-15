import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div style={{textAlign:'center'}}>
        <CircularProgress size={50} thickness={2} />
      </div>
    ) : (
      <div>
        <div id="generalWrapper" className="clearfix w-100 mb-3">
        <div id="pp-wrapper"  className="float-left mt-2 clearfix d-inline" style={{width:'8%'}}>
        <Link to={`/users/${userHandle}`}>
        <img src={userImage} className="img-fluid rounded-circle" style={{width:'100%'}} alt="user-profile"/>
        </Link>
        </div>
        
        <div id="userHandleWrapper" className="float-left mt-1 pl-2 clearfix d-inline" style={{width:'92%'}}>
        <Link to={`/users/${userHandle}`} style={{textDecoration:'none'}}>
        <span className="float-left font-weight-bold" style={{color:'#333'}}>{userHandle}</span>
        </Link>
        </div>

        <div id="timeWrapper" className="text-muted float-left pl-2 clearfix d-inline" style={{width:'92%'}}>
        <small>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</small>
        </div>
        </div>
        <div id="bodyWrapper mt-5 w-100 d-block">
          {body}
        </div>

        <div className="px-1 mt-2">
        <i className="far fa-thumbs-up"/><span className="pl-1">{likeCount}</span>
        <i className="far fa-comment" style={{paddingLeft:'0.3rem'}}/><span className="pl-1">{commentCount}</span>
        </div>

        <hr/>
        <div className="buttons">
          <LikeButton postId={postId}/>
          <button type="button" onClick={this.handleClick} className="text-primary p-1" style={{border:'none', background:'transparent'}}>
            <i className="far fa-thumbs-up"/><span className="text-muted pl-1">Yorum Yap</span>
          </button>
        </div>

        <CommentForm postId={postId} />
        <Comments comments={comments} />
        
      </div>
    );
    return (
      <div>
          <button onClick={this.handleOpen} className="btn" style={{background:'transparent'}}>
          <UnfoldMore color="primary" />
          </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          >
            <button onClick={this.handleClose} className="btn font-weight-bold text-muted" style={{float:'right', position:'absolute', right:'0.5rem', top:'0', background:'transparent'}}>
            x
            </button>
          <DialogContent>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PostDialog);