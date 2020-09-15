import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.jpg';
import MiniLogo from '../../images/mini-logo.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/actions/userActions';
import Notifications from './Notifications';
class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
      };

    render() {
        const {
            user: {
              authenticated,
              credentials: { handle, imageUrl }
            }
          } = this.props;
        return (
            
                        authenticated ? (
                            <nav className="navbar navbar-expand-sm px-sm-5" style={{background:'var(--navbar)'}}>
                            <div className="container">
                            
                            <div id="miniLogoWrapper" style={{ cursor:'pointer'}}>
                            <Link to="/" className="navbar-brand" >
                            <img src={MiniLogo} className="img-fluid" alt="logo" style={{overflow:'hidden', width:'2rem', height:'auto'}}/>
                            </Link>
                            </div>
                            

                            <form className="search-bar mr-auto" style={{position:'relative'}}>
                            <i className="fas fa-search" style={{position:'absolute', color:'#333', top:'0.7rem', left:'0.2rem', fontSize:'0.8rem'}}></i>
                            <input type="text" name="search" onChange={this.handleChange} className="form-control" style={{height:'2rem'}}/>
                            </form>

                            <ul className="navbar-nav ml-auto" style={{fontSize:'0.8rem'}}>
                            
                            <li className="nav-item text-center">
                            <Link to="/" className="nav-link" style={{color:'#fff'}}>
                            <i className="fas fa-home" style={{display:'block'}}/>Ana Sayfa
                            </Link>
                            </li>

                            <li className="nav-item text-center">
                            <Link to="/" className="nav-link" style={{color:'#fff'}}>
                            <i className="fas fa-user-friends" style={{display:'block'}}/>Ağım
                            </Link>
                            </li>

                            <li className="nav-item text-center">
                            <Link to="/" className="nav-link" style={{color:'#fff'}}>
                            <i className="fas fa-briefcase" style={{display:'block'}}/>İş İlanları
                            </Link>
                            </li>

                            <li className="nav-item text-center">
                            <Link to="/" className="nav-link" style={{color:'#fff'}}>
                            <i className="fas fa-envelope" style={{display:'block'}}/>Mesajlaşma
                            </Link>
                            </li>
                                                 
                            <Notifications/>

                            <li className="nav-item text-center">
                            <Link to={`/users/${handle}`} className="nav-link" style={{color:'#fff'}}>
                            <img src={imageUrl} alt="user" className="img-fluid" style={{display:'block', width:'1rem', height:'auto', borderRadius:'50%'}} />Ben
                            </Link>
                            </li>

                            <li className="nav-item text-center">
                            <i className="fas fa-times text-white p-3" onClick={this.handleLogout} style={{cursor: 'pointer'}}></i>
                            </li>

                            </ul> 
                            </div>
                            </nav>
                        ) : (
                            <nav className="navbar navbar-expand-sm px-sm-5">
                            <div className="container">
                            <Link to="/" className="navbar-brand">
                            <img src={Logo} className="img-fluid" alt="logo" style={{overflow:'hidden', width:'8rem', height:'auto'}}/>
                            </Link>
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                            <button className="nav-item p-2" 
                            type="button" 
                            style={ {border:'none', background:'transparent', color: '#777'} }>
                            Hemen Katıl
                            </button>
                            </Link>
                            </li>

                            <li className="nav-item">
                            <Link to="/login" className="nav-link">
                            <button type="button" className="btn btn-outline-primary p-2">Oturum Aç</button>
                            </Link>
                            </li>
                            </ul> 
                            </div>
                            </nav>
                        )
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapActionsToProps = { logoutUser };

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user
});
  
export default connect(mapStateToProps, mapActionsToProps)(Navbar);