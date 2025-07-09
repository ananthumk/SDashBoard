import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { AppContext } from '../../Context/AppContext'
import { useContext } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const { profileData } = useContext(AppContext)
  const username = profileData?.name ? profileData.name.split(' ') : [];
  let nameAlpha = ''
  for (let i = 0; i < username.length; i++) {
    nameAlpha += username[i][0].toUpperCase();
  }

  return (
    <div className='navbar-container'>
      <h1 className='navbar-header' onClick={() => navigate('/')}><span className='navbar-header-bold'>S</span>WIFT</h1>
      <div className='navbar-profile-container' onClick={() => navigate('/profile')}>
        <div className='profile-btn'>
          {nameAlpha}
        </div>
        <p className='user-name'>{profileData?.name}</p>
      </div>
    </div>
  )
}

export default Navbar