import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useEffect, useHistory } from 'react';
import { useState } from 'react';

export default function Review(props) {

    const history = useHistory();

if(!localStorage.getItem("CustomerID")){
  history.push("/LandingPage")
}

    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState({
        "AddressId": "",
        "AddressLine1": "",
        "AddressLine2": "",
        "City": "",
        "State": "",
        "PinCode": "",
        "Country": "",
        "CustomerId": "",
        "SavaAsName": ""
    });
    const [mode,setMode] = useState('');

    useEffect(() => {
        let currentCart = JSON.parse(sessionStorage.getItem('checkoutCart')) || [];
        setCart(currentCart);
        let addr = JSON.parse(sessionStorage.getItem('deliveryAddress')) || {...address};
        let mode = sessionStorage.getItem('mode');
        setMode(mode);
        console.log("addr",addr);
        setAddress(addr)
    }, []);

    const getTotalPrice = () => {
        return cart.reduce((price, item) => price + item.Price * item.Quantity, 0);
    }

    const getFinalPrice = () => {
        let subtotal = getTotalPrice();
        let deliveryFee = (subtotal * 0.01).toFixed(2);
        let serviceFee = (subtotal * 0.02).toFixed(2);
        let tax = (subtotal * 0.09).toFixed(2);
        let totalMoney = (parseFloat(subtotal) + parseFloat(deliveryFee) + parseFloat(serviceFee) + parseFloat(tax));
        sessionStorage.setItem("TotalAmt", totalMoney)
        return (parseFloat(subtotal) + parseFloat(deliveryFee) + parseFloat(serviceFee) + parseFloat(tax));
    }

    const getAddressVisibility = ()=>{
        let visibility = (mode=="Delivery"&&props.deliveryAddress)?'visible':'hidden';
        return visibility;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.map((item) => (
                    <ListItem key={item.DishId} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={item.DishName} secondary={item.DishDesc} />
                        <Typography variant="body2">${item.Price}</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Sub Total" />
                    <Typography variant="subtitle1">
                        ${getTotalPrice()}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid visibility={getAddressVisibility()} item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment Due: ${getFinalPrice()}
                    </Typography>
                    <Typography variant="h7" gutterBottom sx={{ mt: 2 }}>
                        Delivery Address
                    </Typography>
                    <Typography gutterBottom>{address.AddressLine1}</Typography>
                    <Typography gutterBottom>{address.AddressLine2}</Typography>
                    <Typography gutterBottom>{address.City},{address.State},{address.PinCode}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Details
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Sub Total</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>${getTotalPrice().toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Delivery fee</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>${(getTotalPrice() * 0.01).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Service fee</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>${(getTotalPrice() * 0.02).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Tax</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>${(getTotalPrice() * 0.09).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Total</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>${getFinalPrice()}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}