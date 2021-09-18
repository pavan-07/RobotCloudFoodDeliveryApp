import Login from './Login.js';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import react, {useState} from "react";
import '../images/style.css';
import Axios from 'axios';
import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from './../Config'


const LandingPage = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const login =()=> {
          Axios.post(`${backendServer}/LandingPage`, 
        {useremail:email, userpassword: password }
        ).then((response)=>{
            console.log(response)
        });
       
  //    return email.length > 0 && password.length > 0;
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
    const textstyle = {
        fontsize: '30px',
        lineheight: '36px',
         fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
        marginbottom: '36px',
         textalign: 'left'
    }
    const stylebutton = {
        backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${wavebg})`
      }

    return(
        <>
        <Login />
         <div className="Login" style={stylebutton}>
      <Form onSubmit={handleSubmit}>
      <img src={logo} width={'200'} height={'150'} style={styleimg} alt='' />
        
        <h2 style={textstyle}>Welcome Back</h2>
        <br></br>
        <h6 style={textstyle}>Please Sign In with your E-mail</h6>
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
        <Button block size="lg" type="submit" onClick={()=>login()} style={styleimg} disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div> 
    </>
    )
}

export default LandingPage;