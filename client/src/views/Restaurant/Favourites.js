import React, { useState, useEffect } from 'react';

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
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';


const theme = createTheme();

const Favourites = () => {
    const history = useHistory();

    const custId = localStorage.getItem("CustomerID")

    const [FavCards, setFavCards] = useState([]);

    useEffect(async () => {
        const response = await axios.get(`${backendServer}/favourites/${custId}`)
       setFavCards(response.data);

        console.log("fav response",  response);
    }, [])

    return (
        <>
            <Navbar />
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 0,
                        pb: 3,
                    }}
                ></Box>

                <Container sx={{ py: 4 }} maxWidth= "md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {FavCards.map((card) => (

                            <Grid item key={card} xs={6} sm={3} md={4}>

                                <Card sx={{ maxWidth: 250 }}>
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={card.Image} 
                                        alt="Food Loading..."
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.RestaurantName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.RestaurantDesc}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                         ))} 
                    </Grid>
                </Container>
            </main>
        </>
    );


}

export default Favourites;