import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
//Redux
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  render() {
    const {
      profile: { handle, createdAt, imageUrl, bio, website, location, }
    } = this.props;
    return (
      <div className="profile-summary clearfix">
      <div className="card" style={{position:'relative'}}>
        <div className="bg-primary w-100" style={{height:'10rem', position:'absolute', top:0, left:0}}/>
                
                <div className="pl-4 d-inline" id="imgWrapper" style={{zIndex:1,marginTop:'5rem'}}>
                  <div id="imgWrapperr" className="d-inline">
                  <img src={imageUrl} className="img-fluid mx-auto my-auto rounded-circle" style={{width:'10rem',height:'10rem', border:'3px solid #fff' }} alt="user"/>
                  <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <button onClick={this.handleEditPicture} type="button" className="btn btn-primary">
                <i className="fas fa-pen"/>
                </button>
                  </div>
                  <div className="card-body d-inline float-right" style={{width:'25%', marginTop:'5rem', textAlign:'right'}}>
                      <EditDetails/>
                  </div>
                </div>
                
                <div className="text-left" >
                <div className="card-body float-left mr-auto" style={{width:'25%'}}>
                  <h5 className="card-title">{handle}</h5>
                  <p className="card-text">{bio}</p>
                  <p className="card-text">{location}</p>
                  <p className="card-text">{website}</p>
                  <div>{dayjs(createdAt).format('MMM YYYY')} tarihinde katıldı</div>
                </div>
                </div>
            </div>
    </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { uploadImage };

export default connect(mapStateToProps, mapActionsToProps)(Profile);
