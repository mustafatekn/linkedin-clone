import React, { Component } from 'react'
import HomeUnauthenticatedImg from '../images/home-unauthenticated.png';
import {Link} from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import ProfileCard from '../components/profile/ProfileCard';
import Post from '../components/post/Post';
import {getPosts} from '../redux/actions/dataActions';
import PostPost from '../components/post/PostPost';

class home extends Component {

    componentDidMount = async () => {
        await this.props.getPosts();
    }

    render() {
        const {
            user: {
              authenticated,
              loading
            },
          } = this.props;

          const { posts } = this.props.data;

        return (
            loading ? (
                    <CircularProgress size={30} style={{position:'fixed', top:'50%', right:'50%'}}/>
                
            ) : (
                <div>
                <Navbar/>
                {
                    authenticated ? (
                        
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                <ProfileCard/>
                                </div>

                                <div className="col-6">
                                <PostPost/>
                                {posts.map((post) => <Post key={post.postId} post={post}/>)}
                                </div>

                                <div className="col">
                                <div className="">
                                <hr className="mt-4 clearfix" style={{width:'90%', margin:'auto'}} />

                                <div className="mt-3 text-muted" style={{fontSize:'0.8rem'}}>
                                    <div className="row mx-auto">
                                        <div className="col">Hakkımızda</div>
                                        <div className="col">Erişilebilirlik</div>
                                        <div className="col">Yardım Merkezi</div>
                                    </div>
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                        
                    ) : (
                        <div style={{position:'relative'}}>
                        <div className="container mt-3 clearfix">
                <h1 className="text-primary float-left" style={{fontSize:'3.5rem', width:'55%'}}>Profesyonel topluluğunuza hoş geldiniz!</h1>
                <div className="float-right" style={{width:'45%'}}>
                <img src={HomeUnauthenticatedImg} className=""  alt="home"/>
                </div>
                
                <ul className="navbar-nav ml-auto float-left mt-5" style={{width:'55%'}}>
                <li className="nav-item my-1 nav-link" style={{ width:'70%'}}>
                        <Link to="/">
                        <button 
                        type="button" 
                        className="btn btn-outline-dark text-left" 
                        style={{width:'100%', fontSize:'1.4rem'}}>
                            İş ilanı arayın
                            <span className="float-right">{'>'}</span>
                            </button>
                        </Link>
                    </li>

                    <li className="nav-item my-1 nav-link" style={{ width:'70%'}}>
                        <Link to="/">
                        <button 
                        type="button" 
                        className="btn btn-outline-dark text-left" 
                        style={{width:'100%', fontSize:'1.4rem'}}>
                            Tanıdığınız bir kişiyi bulun
                            <span className="float-right">{'>'}</span>
                            </button>
                        </Link>
                    </li>

                    <li className="nav-item my-1 nav-link" style={{ width:'70%'}}>
                        <Link to="/">
                        <button 
                        type="button" 
                        className="btn btn-outline-dark text-left" 
                        style={{width:'100%', fontSize:'1.4rem'}}>
                            Yeni bir yetenek öğrenin
                            <span className="float-right">{'>'}</span>
                            </button>
                        </Link>
                    </li>

                </ul>

            </div>
            </div>
                    )
                }
            </div>
            )
            
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user,
    UI: state.UI,
    data: state.data
});

export default connect( mapStateToProps, {getPosts} )(home);
