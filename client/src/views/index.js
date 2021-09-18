import React from 'react'
import Login from './Login.js';
import LandingPage from './LandingPage.js'
import Dashboard from './Dashboard.js';
import UserProfile from './Profile/UserProfile.js';


const Home = () => {
    return (
        <>
            <Login />
            <Dashboard />
            <UserProfile />
            {/* <LandingPage /> */}
        </>
    )
}

export default Home;