
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Comment from './Pages/Comment/Comment';
import Profile from './Pages/Profile/Profile';
import { Routes , Route } from 'react-router-dom'
import { AppContext } from './Context/AppContext';
 
function App() {
  const [profileData, setData] = useState({});

  useEffect(() => {
           const fetchProfileData = async() => {
            try {
                const cachedData = localStorage.getItem('profileData')
                if(cachedData){
                  setData(JSON.parse(cachedData))
                  return 
                }
               
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (response.ok){
                    const profileData  = await response.json();
                    const selectedProfile = profileData[1]
                    setData(selectedProfile); 
                    localStorage.setItem('profileData', JSON.stringify(selectedProfile))
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
           }
           fetchProfileData()
        }, [], [profileData])
  return (
    <AppContext.Provider value={{ profileData }}>
      <div className="App">
      <Navbar />
      <div className='contents'>
        <Routes>
            <Route path='/' element={<Comment />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      
    </div>
    </AppContext.Provider>
  );
}

export default App;
