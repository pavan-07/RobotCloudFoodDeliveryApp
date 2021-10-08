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


const theme = createTheme();


const RestaurantCustomerView = () => {
    const [cards, setCards] = useState([]);

    const [Image, setImage] = useState('');
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
        setImage(response.data.Image)
        setEmail(response.data.EmailId)
        setDob(response.data.DoB)
        setPhoneNumber(response.data.PhoneNumber)
        setNickName(response.data.NickName)
        setCountry(response.data.Country)
        setCity(response.data.City)
        setName(response.data.CustomerName)

    }, [])




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
            <div className="container">
                <div className="row">
                    <div className="col s12 board">
                        <table id="simple-board">
                            <tbody>
                                {Name}{NickName}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RestaurantCustomerView;