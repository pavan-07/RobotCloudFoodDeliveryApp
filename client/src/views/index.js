import React from 'react'
import Login from './Login.js';
import LandingPage from './LandingPage.js'
import Dashboard from './Dashboard.js';


const Home = () => {
    return (
        <>
            <Login />
            <Dashboard />
            
            {/* <LandingPage /> */}
        </>
    )
}

export default Home;