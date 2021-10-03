import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import '../images/style.css';
import axios from 'axios';
import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from '../Config'
import { useHistory } from 'react-router-dom';
import {useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {signed} from '../actions';



const RestaurantRegister = () => {
    const history = useHistory();
    const [RestaurantName, setRestaurantName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const dispatch = useDispatch();


    const Register = () => {
        axios.post(`${backendServer}/RegisterUser/Restaurant`,
            { RestaurantName: RestaurantName, useremail: email, userpassword: password }
        ).then((response) => {
            console.log(response)
      dispatch(signed(RestaurantName, email ));
            history.push('/RestaurantDashboard')
        });

        //    return email.length > 0&& password.length > 0;
    }
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

    }
    const styleimg = {
        display: 'block',
        margin: 'auto'
    }
    const stylebutton = {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${wavebg})`
    }
    const textstyle = {
        fontsize: '30px',
        lineheight: '36px',
        fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
        marginbottom: '36px',
        textalign: 'center',
        margin: '0px auto',
        display: 'block'
    }
    return (
        <>
            <Login />
            <div className="Login" style={stylebutton}>
                <Form onSubmit={handleSubmit}>
                    <img src={logo} width={'200'} height={'150'} style={styleimg} alt='' />
                    <h4 style={textstyle}>Do you own a Restaurant?</h4>
                    <br></br>
                    <h5 style={textstyle}>Register and start serving</h5>
                    <br></br>

                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={RestaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    <Button block size="lg" type="submit" onClick={() => Register()} style={styleimg} disabled={!validateForm()}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default RestaurantRegister;