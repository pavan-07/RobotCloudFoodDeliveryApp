import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './views/Login'
import Home from './views/';
import LandingPage from "./views/LandingPage";
import { Route } from 'react-router-dom';
import Register from "./views/Register";


const App = ()=> {
    return (
        <>
        <CssBaseline/>
        {/* <Login /> */}
         <Route exact path="/" component={Home}></Route>
        <Route path="/LandingPage" component={LandingPage}></Route>
        <Route path="/Register" component={Register}></Route>
        
        </>
    );
}

export default App;