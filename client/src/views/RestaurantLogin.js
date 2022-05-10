import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import react, { useState, useEffect } from "react";
import '../images/style.css';
import axios from 'axios';
//import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from './../Config'
import { useHistory } from 'react-router-dom';
import {useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import  logged  from '../actions';
import { Row, Col, Alert } from 'react-bootstrap';


const RestaurantLogin = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [alert, setAlert] = useState('');


  const login = () => {
    axios.post(`${backendServer}/RestaurantUser`,
      { useremail: email, userpassword: password }
    ).then((response) => {
      console.log("Restaurant Login", response.data[0].RestaurantId)
       localStorage.setItem("RestaurantId",  response.data[0].RestaurantId)
      dispatch(logged(response.data[0].RestaurantEmail, response.data[0].RestaurantName ));
      history.push('/RestaurantDashboard')
    })
      .catch((err) => {
        setAlert("Invalid User Name or Password")
      })

    //    return email.length > 0 && password.length > 0;
  }

  console.log(email)

  useEffect(async () => {
    localStorage.setItem('currentRestaurantUser', email);
  }, [email]);

  const value = useState(async () => {
    localStorage.getItem('currentRestaurantUser')
  });
  console.log("curr user", value)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // axios.post(`${backendServer}/RestaurantUser`,
    //   { useremail: email, userpassword: password }
    // ).then((response) => {
    //   console.log(response)
    //   localStorage.setItem("RestaurantId", response.data.id)
    //   history.push('/RestaurantDashboard')
    // })
    //   .catch((err) => {
    //     alert(err)
    //   })

  }
  const styleimg = {
    display: 'block',
    margin: 'auto'
  }
  const textstyle = {
    fontsize: '30px',
    lineheight: '36px',
    fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
    marginbottom: '36px',
    textalign: 'left',
    width: 'max-content'
  }
  const stylebutton = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${wavebg})`
  }

  return (
    <>
      <Login />
      <div className="Login" style={stylebutton}>
        <Form onSubmit={handleSubmit}>
          {/* <img src={logo} width={'200'} height={'150'} style={styleimg} alt='' /> */}
          <h4>Robot Cloud Food Delivery Application</h4>
          <h2 style={textstyle}>Welcome Back</h2>
          <br></br>
          <h6 style={textstyle}>Please Sign In & open your Restaurant to Customer's </h6>
          <br></br>
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
          <Button block size="lg" type="submit" onClick={() => login()} style={styleimg} disabled={!validateForm()}>
            Login
          </Button>
          <br></br>
          {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}

        </Form>
      </div>
    </>
  )
}

export default RestaurantLogin;