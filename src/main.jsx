import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import RegisterPage from './pages/RegisterPage.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <LoginPage/> */}
    {/* <ProfilePage/> */}
    <RegisterPage/>

  </StrictMode>
)
