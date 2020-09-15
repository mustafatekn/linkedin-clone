import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/logo.jpg';
import { Link } from 'react-router-dom';

// MUI Stuff
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
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
        <div className="container text-center">
        <div className="d-block w-100 clearfix">
        <Link to="/" className="navbar-brand float-left clearfix d-block">
        <img src={Logo} className="img-fluid mr-auto" alt="logo" style={{overflow:'hidden', width:'8rem', height:'auto'}}/>
        </Link> 
        </div>
    
        <h2>Profesyonel hayatınızdan en iyi şekilde yararlanın</h2>
       <form className="mx-auto my-5" style={{width:'40%'}} noValidate onSubmit={this.handleSubmit}>
           <div className="form-group clearfix">
               <label htmlFor="email" className="float-left">Email</label>
               <input 
               type="email" 
               name="email"
               value={this.state.email}
               error={errors.email ? true : false} 
               className="form-control"
               onChange={this.handleChange}
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
               value={this.state.password} 
               error={errors.password ? true : false}
               className="form-control"
               onChange={this.handleChange}
               />
               {errors.password && 
                <small className="float-left">Password {errors.password}</small>
                }
           </div>

           <div className="form-group clearfix">
               <label htmlFor="confirmPassword" className="float-left">Confirm Password</label>
               <input 
               type="password" 
               name="confirmPassword" 
               value={this.state.confirmPassword} 
               error={errors.confirmPassword ? true : false}
               className="form-control"
               onChange={this.handleChange}
               />
               {errors.confirmPassword && 
                <small className="float-left">confirmPassword {errors.confirmPassword}</small>
                }
           </div>

           <div className="form-group clearfix">
               <label htmlFor="text" className="float-left">Handle</label>
               <input 
               type="text" 
               name="handle" 
               error={errors.handle ? true : false}
               value={this.state.handle} 
               className="form-control"
               onChange={this.handleChange}
               />
               {errors.handle && 
                <small className="float-left">Handle {errors.handle}</small>
                }
           </div>
           <small id="signupHelp" className="form-text text-muted">Kabul Et ve Katıl’ı tıklayarak, LinkedIn’in Kullanıcı Anlaşmasını, Gizlilik Politikasını ve Çerez Politikasını kabul etmiş olursunuz.</small>
           
           {errors.general && (
            <small>
                {errors.general}
            </small>
            )}
           <button 
           type="submit" 
           className="btn btn-primary mt-5 w-100 p-2"
           disabled={loading}
           style={{position:'relative'}}
            >Kabul Et ve Katıl{loading && (
                <CircularProgress size={30} style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)', overflow:'hidden'}}/>
            )}</button>
       </form>
    </div>
    );
  }
}

signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(signup);