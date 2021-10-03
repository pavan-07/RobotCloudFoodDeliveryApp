import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



const theme = createTheme();

const CustomerOrder = () => {

    const [OrderResponse, setOrderResponse] = useState([]);

    const [searchValue, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [value, setValue] = useState([])
    //const [value2, setValue2] = useState([])


    const onChange = (event) => {
        setSearch(event.target.value)

        console.log("filter", event.target.value)
        if(event.target.value == "All Orders")
        {

            console.log("else", event.target.value)
            setOrderResponse(value)
        } 
    else if (event.target.value != '') {
            let filter_1 = value.filter(res => res.RestaurantName != null && res.OrderStatus == event.target.value);
            console.log("orderFil", filter_1)
            setOrderResponse(filter_1);
           
        }
             
    }
   
    

    let FilterValue = '';
      //console.log("filter Value", searchValue)

    // switch (searchValue) {
    //     case 1:
    //         FilterValue = "Order Received";
    //         break;
    //     case 2:
    //         FilterValue = "Preparing";
    //         break;
    //     case 3:
    //         FilterValue = "On The Way";
    //         break;
    //     case 4:
    //         FilterValue = "Delivered";
    //         break;
    //     case 5:
    //         FilterValue = "Pick Up Ready";
    //         break;
    //     case 6:
    //         FilterValue = "Picked Up";
    //         break;
    //     default:
    //         FilterValue = "";
    //         break;
    // }

  //  console.log(FilterValue)

    

    //   }
    //      if(OrderResponse.length != 0)
    //      {
    // let filter_1 = OrderResponse.filter(res => res.RestaurantName != null && res.OrderStatus == FilterValue);

    // console.log("orderFil", filter_1)

    //  console.log(OrderResponse)
    //      }



    useEffect(async () => {
        console.log("in customer order")

        const CustomerId = localStorage.getItem("CustomerID")

        const response = await axios.get(`${backendServer}/Orders/${CustomerId}`)

        console.log("orders", response.data)
        setOrderResponse(response.data)
        setValue(response.data)
        //const data1 = OrderResponse[0].DeliveryType; 
        // console.log(OrderResponse[0].DeliveryType)
    }, [])

    return (
        <>
            <Navbar handleBtnChange={onChange} />
            <h2 style={{
                display: "flex",
                paddingTop: "20px",
                justifyContent: "center",
                alignItems: "center"
            }}>Your Orders</h2>
            <div style={{
                display: "flex",
                paddingTop: "80px",
                justifyContent: "center",
                alignItems: "center"
            }}>




                <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }}>

                    {/* {OrderResponse.map((card, index) => { */}
                    {OrderResponse.map((card) => (
                        <>
                            <ListItem key={card.OrderId} alignItems="flex-center" >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={card.Image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={card.RestaurantName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {card.LastUpdatedTime}
                                            </Typography>
                                            {" ", card.OrderStatus}
                                        </React.Fragment>
                                    }
                                />

                            </ListItem>

                            <Divider variant="middle" component="li" padding="20px" />
                        </>
                    ))}


                </List>



            </div>
        </>

    );

}

export default CustomerOrder;