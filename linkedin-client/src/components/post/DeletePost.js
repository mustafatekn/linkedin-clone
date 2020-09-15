import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {

    return (
      <Fragment>
          <button onClick={this.handleOpen} type="button" className="btn">
          <DeleteOutline color="secondary" />
          </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Bu gönderiyi silmek istediğine emin misin?
          </DialogTitle>
          <DialogActions>
              <button onClick={this.handleClose} type="button" className="btn">
                  İptal et
              </button>
              <button onClick={this.deletePost} type="button" className="btn">
                  Sil
              </button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deletePost }
)(DeletePost);