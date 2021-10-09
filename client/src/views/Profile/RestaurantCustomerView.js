import Navbar from '../Navbar';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'react-bootstrap/esm';
import avatar from '../../images/img_avatar2.png'
import logo from '../../images/UberEATS.png'
import backendServer from '../../Config'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import avatar1 from '../../images/avatar.svg'

const theme = createTheme();


const RestaurantCustomerView = () => {
    const [cards, setCards] = useState([]);

    const [Image, setImage] = useState(`${avatar1}`);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Dob, setDob] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [NickName, setNickName] = useState('');
    const [Country, setCountry] = useState('');
    const [City, setCity] = useState('');


    const TempCustomerId = sessionStorage.getItem("TempCustomerId")
    console.log("TempCustomerId", TempCustomerId)


    useEffect(async () => {

        const response = await axios.get(`${backendServer}/customer/${TempCustomerId}`);

        console.log("TempCustomerId", response.data)
        setCards(response.data)
        setImage(response.data[0].Image)
        setEmail(response.data[0].EmailId)
        setDob(response.data[0].DoB)
        setPhoneNumber(response.data[0].PhoneNumber)
        setNickName(response.data[0].NickName)
        setCountry(response.data[0].Country)
        setCity(response.data[0].City)
        setName(response.data[0].CustomerName)

    }, [])


    console.log("TempCustomer name", Name)


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const style = {
        display: "flex",
        paddingTop: "80px",
        justifyContent: "center",
        alignItems: "center"
    }
    const imageStyle = {
        "margin-left": '45%'
    }

    return (
        <>
            <Navbar />
            <br></br>
      <div class="container">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" /> */}

                      <img className="main myImage" src={Image} height={140} width={140} alt='Damn!'/>
                      <br></br>

                      
                    </div>
                 
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Full Name</label>
                      <input type="text" class="form-control" id="fullName" placeholder={Name}/>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input type="email" class="form-control" id="eMail" placeholder={Email}  />
                      {/* onChange={(e) => { setEmail(e.currentTarget.value); }} */}
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input type="text" class="form-control" id="phone" placeholder={PhoneNumber}  />
                    </div>
                  </div>

                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                  </div>

                  {/* country */}

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="city">Country</label>
                      <input type="name" class="form-control" id="city" placeholder={Country}  />
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="city">City</label>
                      <input type="name" class="form-control" id="city" placeholder={City} />
                    </div>
                  </div>
                  {/* <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">State</label>
                      <input type="text" class="form-control" id="state" placeholder={State} />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Zip Code</label>
                      <input type="text" class="form-control" id="zip" placeholder={zipcode} />
                    </div>
                  </div> */}
                </div>
                <br></br>
               
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )

}

export default RestaurantCustomerView;