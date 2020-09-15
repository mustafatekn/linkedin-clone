import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="container">
        {comments.map((comment,index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <div key={createdAt} className="mb-3">

            <div id="generalWrapper" className="clearfix w-100 mb-3">
            <div id="pp-wrapper"  className="float-left mt-2 clearfix d-inline" style={{width:'8%'}}>
            <Link to={`/users/${userHandle}`}>
            <img src={userImage} className="img-fluid rounded-circle" style={{width:'100%'}} alt="user-profile"/>
            </Link>
            </div>
            
            <div id="userHandleWrapper" className="float-left mt-1 pl-2 clearfix d-inline" style={{width:'92%'}}>
            <Link to={`/users/${userHandle}`} style={{textDecoration:'none', color:'#333'}}>
            <span className="float-left font-weight-bold" style={{color:'#333'}}>{userHandle}</span>
            </Link>
            </div>
            </div>

            <div className="card-text px-2 mt-2">
                {body}
            </div>
            <div id="timeWrapper" className="text-muted pl-2 mb-2" style={{width:'92%'}}>
            <small>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</small>
            </div>
            {index !== comments.length - 1 && (
            <hr/>
            )}             
            </div>
          )
        })}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;