import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.jpg'
// MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <div>
                <div style={{background:'var(--navbar)', height:'.5rem'}}></div>
                <div className="container text-center">
                    <div className="mt-5">
                    <Link to="/" className="navbar-brand">
                    <img src={Logo} className="img-fluid" alt="logo" style={{overflow:'hidden', width:'6rem', height:'auto'}}/>
                    </Link> 
                    </div>
                    <h4>Tekrar Hoş Geldiniz</h4>
                    <p className="text-muted">Bir sonraki fırsatınızı kaçırmayın. Profesyonel dünyanızından haberdar olmak için oturum açın.</p>
                    <form noValidate onSubmit={this.handleSubmit} className="mx-auto my-5" style={{width:'40%'}}>
                    <div className="form-group clearfix">
                        <label htmlFor="email" className="float-left">Email</label>
                        <input 
                        type="email" 
                        name="email" 
                        error={errors.email ? true : false} 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        className="form-control"
                        />
                        {errors.email && 
                        <small className="float-left">Email {errors.email}</small>
                        }
                    </div>

                    <div className="form-group clearfix">
                        <label htmlFor="password" className="float-left">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        error={errors.password ? true : false} 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        className="form-control"
                        />
                        {errors.password && 
                        <small className="float-left">Password {errors.password}</small>
                        }
                    </div>

                    {errors.general && (
                    <small>
                        {errors.general}
                    </small>
                    )}
                    <button 
                    type="submit" 
                    className="btn btn-primary mt-3 w-100 p-2"
                    style={{position:'relative'}}
                    >Oturum açın{loading && (
                        <CircularProgress size={30} style={{position:'absolute', top:'50%', left:'50%', zIndex:1, overflow:'hidden'}}/>
                      )}
                    </button>
                    <Link to="/" style={{textDecoration:'none'}}>
                        <p className="my-3 text-primary" >Şifrenizi mi unuttunuz?</p>
                    </Link>
                    <p>LinkedIn'de yeni misiniz? <Link to="/signup" style={{textDecoration:'none'}}>Hemen katılın</Link></p>          
                    </form>
                    
            </div>
            </div>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(login);