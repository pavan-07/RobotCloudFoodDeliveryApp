import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './views/Login'
import Home from './views/';
import LandingPage from "./views/LandingPage";
import { Route } from 'react-router-dom';
import Register from "./views/Register";
import UserProfile from "./views/Profile/UserProfile";
import Restaurant from "./views/Restaurant/Restaurant"
import Navbar from "././views/Navbar"
import RestaurantRegister from './views/RestaurantResigter'
import RestaurantLogin from "./views/RestaurantLogin";
import RestaurantDashboard from "./views/Dashboard/RestaurantDashboard";
import RestaurantMenu from "./views/Restaurant/Menu"

const App = () => {
    return (
        <>
            <CssBaseline />
            {/* <Login /> */}
            <Route exact path="/" component={Home}></Route>
            <Route path="/LandingPage" component={LandingPage}></Route>
            <Route path="/Register" component={Register}></Route>
            <Route path="/UserProfile" component={UserProfile}></Route>
            <Route path="/Restaurant" component={Restaurant}></Route>
            <Route path="/RestaurantRegister" component={RestaurantRegister}></Route>
            <Route path="/RestaurantLogin" component={RestaurantLogin}></Route>
            <Route Path="/RestaurantDashboard" component={RestaurantDashboard}></Route>
            <Route Path="/RestaurantMenu" component={RestaurantMenu}></Route>

            <Route path="/Navbar" component={Navbar}></Route>


        </>
    );
}

export default App;