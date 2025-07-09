import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const Profile = () => {
  const { profileData } = useContext(AppContext)

  const username = profileData?.name ? profileData.name.split(' ') : [];
  let nameAlpha = ''
  for (let i = 0; i < username.length; i++) {
    nameAlpha += username[i][0].toUpperCase();
  }

  const navigate = useNavigate()

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <FaArrowLeftLong className='back-icon' onClick={() => navigate('/')} />
        <h1>Welcome, {profileData?.name}</h1>
      </div>
      <div className='profile-details-container'>
        <div className='profile-card'>
          <div className='profile-image'>
            {nameAlpha}
          </div>
          <div className='user-name-email-container'>
            <h3>{profileData?.name}</h3>
            <p>{profileData?.email}</p>
          </div>
        </div>
        <div className='profile-info-container'>
          <div className='profile-info'>
            <label>User ID</label>
            <div className='profile-info-value'>
              {profileData?.id}
            </div>
          </div>
          <div className='profile-info'>
            <label>Name</label>
            <div className='profile-info-value'>
              {profileData?.name}
            </div>
          </div>
          <div className='profile-info'>
            <label>Email ID</label>
            <div className='profile-info-value'>
              {profileData?.email}
            </div>
          </div>
          <div className='profile-info'>
            <label>Address</label>
            <div className='profile-info-value'>
              {profileData?.address?.street}, {profileData?.address?.suite}, {profileData?.address?.city}, {profileData?.address?.zipcode}
            </div>
          </div>
          <div className='profile-info'>
            <label>Phone</label>
            <div className='profile-info-value'>
              {profileData?.phone}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile