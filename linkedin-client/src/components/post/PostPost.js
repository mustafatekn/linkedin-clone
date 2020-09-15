import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions';


class PostPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', errors: {} });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postPost({ body: this.state.body });
  };


  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
      user: {
        credentials: { handle, imageUrl },
      }
    } = this.props;
    return (
        <div className="card mb-5" >
            <div className="row">
                <div className="col-5 text-muted font-weight-bold">
                    <li className="nav-link py-4" style={{cursor:'pointer'}}>
                    <i className="fas fa-edit"/><span className="pl-2" >Bir gönderi başlat</span>
                    </li>
                </div>
                <div className="col text-muted font-weight-bold px-0">
                  <div className="row p-0">
                              
                    <li className="nav-link p-4 d-inline text-center" style={{cursor:'pointer', width:'33.333%'}}>
                      <i className="fas fa-camera"/>
                    </li>

                    <li className="nav-link p-4 d-inline text-center " style={{cursor:'pointer', width:'33.333%'}}>
                      <i className="fas fa-camera"/>
                    </li>

                    <li className="nav-link p-4 d-inline text-center" style={{ cursor:'pointer', width:'33.333%'}}>
                      <i className="fas fa-camera"/>
                    </li>
                              
                  </div>   
                </div>
              </div>

              <div id="generalWrapper clearfix" className="d-inline">
              <div id="pp-wrapper"  className="float-left mt-2 pl-2 clearfix" style={{width:'10%', float:'left'}}>
              <Link to={`/users/${handle}`}>
              <img src={imageUrl} className="img-fluid rounded-circle" style={{width:'3rem', height:'3rem'}} alt="user-profile"/>
              </Link>
              </div>
              
              <div id="userHandleWrapper" className="float-left mt-3 pl-3 clearfix" style={{width:'90%', float:'left'}}>
              <Link to={`/users/${handle}`} style={{textDecoration:'none', color:'#333'}}>
              <span className="float-left font-weight-bold">{handle}</span>
              </Link>
              </div>
              </div>

              <form className="mt-3" onSubmit={this.handleSubmit} ref={(a) => this.formRef = a}>
              <div className="form-group">
              <input
              type="text"
              name="body"
              error={errors.body ? true: false}
              onChange={this.handleChange}
              className="w-100 p-2"
              rows="2" 
              placeholder="Ne hakkında konuşmak istiyorsunuz?" 
              style={{border:'none', outline:'none'}}
              />{errors.body && 
                <small>{errors.body}</small>
                }
              </div>
              <div id="buttonWrapper" className="p-1 clearfix">
              <button type="submit" className="btn btn-primary float-right">
                Yayınla{loading && (
                  <CircularProgress
                    size={30}
                    style={{zIndex:1, overflow:'none'}}
                  />
                )}
                </button>
              </div>
              
            </form>
        </div>

    );
  }
}

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect(
  mapStateToProps,
  { postPost, clearErrors }
)(PostPost);