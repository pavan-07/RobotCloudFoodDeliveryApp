
import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';

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

import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';


const theme = createTheme();

const AddDish = () => {

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');

    const [image1, getImage1] = useState('');
    const [imageUrl1, getImageUrl1] = useState('');
     const [name1, setName1] = useState('');
    const [desc1, getDesc1] = useState('');
    const [category1, getCategory1] = useState('');
    const [price1, getPrice1] = useState('');
    const [type1, getType1] = useState('');

    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget);

        if (image) {
            let imageData = new FormData()
            imageData.append('image', image)
            let response = await axios.post(`${backendServer}/image/dish`, imageData);
            setImageUrl(response.data.imageUrl);
        }

        const restaurantId = localStorage.getItem('RestaurantId');
        const dishid = localStorage.getItem('editDish');

        let payload = {
            restaurantId: restaurantId,
            dishdesc: data.get('desc'),
            category: data.get('category'),
            price: data.get('price'),
            name: data.get('name'),
            //   type: data.get('type'),
            imageUrl: imageUrl
        }

        axios.post(`${backendServer}/restaurant/dishes/${dishid}`, payload)
            .then(response => {
                console.log(response)
                sessionStorage.setItem("DishId", response.data.dishId)
                history.push("/RestaurantDashboard")
            })
            .catch(err => {
                console.log(err);
            });

    };

    useEffect(async () => {
        const DishId = localStorage.getItem('editDish');
        if (DishId != '') {
            const response = await axios.get(`${backendServer}/dishes/${DishId}`);
            console.log("Dishes response", response)
            const dish = response.data;
            setName1(dish.DishName);
        //     setDesc(dish.DishDesc);
        //     setCategory(dish.DishCategory);
        //     setType(dish.DishType);
        //     setPrice(dish.Price);
        //     setImageUrl(dish.ImageUrl);
         }
    }, [])

    const onPhotoChange = (event) => {
        if (event.target.files.length === 0)
            return;
        const file = event.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const fileStyle = {
        display: 'none'
    }

    const imageStyle = {
        "margin-left": '45%'
    }


    // useEffect(async () => {

    //     const DishId = localStorage.getItem("editDish");
    //     console.log("Add Dish Page", DishId)
    //     if (DishId != '') {
    //          const response = await axios.get(`${backendServer}/dishes/${DishId}`);
    //         console.log("Dishes response", name)
    //           const dish = response.data;
    //         setName(dish.DishName);

    //     }
    // }, [])


    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <CssBaseline />
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2} >
                                <Grid style={imageStyle} item xs={12} sm={6} alignItems="center">
                                    <Avatar
                                        src={imageUrl}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                    <label htmlFor="image">
                                        <Input accept="image/*" style={fileStyle} id="image" name="image" required autoFocus type="file" onChange={onPhotoChange} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name of the Dish"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="desc"
                                        label="Description of the Dish"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        autoComplete="desc"
                                        autoFocus
                                        multiline
                                        minRows="2"
                                    />

                                </Grid>
                                {/* <Grid item xs={12}>
                                        <TextField
                                            margin="none"
                                            required
                                            fullWidth
                                            id="type"
                                            label="Type of the Dish"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            name="type"
                                            autoComplete="type"
                                            autoFocus
                                        />
    
                                    </Grid> */}

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        type="text"
                                        id="category"
                                        label="Category"
                                        name="category"
                                        autoComplete="category"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="number"
                                        id="price"
                                        label="Price"
                                        name="price"
                                        autoComplete="price"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default AddDish;