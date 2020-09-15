import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class ProfileCard extends Component {
    render() {
        const {
            user: {
              credentials: { handle, imageUrl },
            }
          } = this.props;
      
        return (
                <div className="card" style={{ position:'relative'}}>
                    <div className="w-100 bg-primary" style={{height:'3rem', position:'absolute', top:0, left:0}}/>
                    <div className="mt-4 text-center" id="imgWrapper" style={{zIndex:1}}>
                    <img src={imageUrl} className="img-fluid mx-auto my-auto rounded-circle" style={{width:'4rem',height:'4rem' }} alt="user"/>
                    </div>
                    
                    <div className="card-body">
                        <h5 className="card-title text-center">{handle}</h5>
                        <hr/>
                        <p className="card-text text-center">26 bağlantı</p>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
ProfileCard.propTypes = {
    user: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(ProfileCard);