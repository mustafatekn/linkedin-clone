import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Redux Stuff
import { connect } from 'react-redux';
import { submitComment} from '../../redux/actions/dataActions';
class CommentForm extends Component {

  state = {
    body: '',
    errors: {}
  };

  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });
  };

    render() {

      const {
        user: {
          credentials: { imageUrl },
        },
        authenticated
      } = this.props;
      
      const errors = this.state.errors;

      const commentFormMarkup = !authenticated ? (<Link to="/login">
        <button>login</button>
      </Link>) : (
        <div id="generalWrapper my-2 w-100 clearfix">
          <div id="pp-wrapper"  className="mt-2 pl-2 float-left" style={{width:'9%', height:'auto'}}>
            <img src={imageUrl} className="img-fluid rounded-circle" style={{width:'100%'}} alt="user-profile"/>
          </div>
          <form onSubmit={this.handleSubmit} className="my-2 px-2 float-left" style={{width:'91%'}}>
            <input 
            name="body"
            type="text" 
            error={errors.comment ? true : false}
            value={this.state.body}
            onChange={this.handleChange}
            className="from-group p-2 rounded-pill w-100" 
            style={{outline:'none', border:'1px solid #ccc'}}
            />
            {
              errors.comment && (<small>Comments {errors.comment}</small>)
            }
            <button type="submit" className="btn btn-primary mt-2 float-right">Yayınla</button>
          </form>
        </div>
      )
      return commentFormMarkup;
    }
}

CommentForm.propTypes = {
  user: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect( mapStateToProps, {submitComment})(CommentForm);
