
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
import NavbarCustomer from '../NavbarCustomer';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const theme = createTheme();

const styleimg = {
  display: 'block',
  margin: 'auto',
  height: '50',
  width: '25'
}

const RestaurantView = () => {
  const history = useHistory();


  if(!localStorage.getItem("CustomerID")){
    history.push("/LandingPage")
  }
  const [res1, setRes1] = useState([]);
  const [il, setIl] = useState([]);
  //const [res1, getRes1] = useState('');

  const [cards, setCards] = useState([]);
  const [initialLoad, setInitialLoad] = useState([]);
  const [filter, setFilter] = useState([]);
 

  const [searchValue, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);


  // get data
  useEffect(async () => {
    const country = sessionStorage.getItem('country');
    const city = sessionStorage.getItem('city');
    const url = `${backendServer}/Restaurant`;
    const response = await axios.get(url);
    console.log("Restaurant View", response)
    setInitialLoad(response.data);
    setCards(response.data);
    console.log(cards);
   // console.log("store is", store.getState());

  }, []);

  //get data close

  

  const onSearch = (type,searchTerm) => {

    console.log(type, searchTerm)
    if (searchTerm == '') {
      setCards(initialLoad);
      return;
    } else {
      switch(type){
       case "Restaurant":
         let rfilter = initialLoad.filter(card => card.RestaurantName != null && card.RestaurantName.toLowerCase().includes(searchTerm.toLowerCase()));
         setCards(rfilter);
         console.log("InitialLoad", rfilter)
         break;
       case "Location":
         let lfilter = initialLoad.filter(card => card.RestaurantName != null && card.City.toLowerCase().includes(searchTerm.toLowerCase()));

         setCards(lfilter);
         break;
       case "Delivery Type":
          let tfilter = initialLoad.filter(card => card.RestaurantName != null && card.DeliveryMode.toLowerCase().includes(searchTerm.toLowerCase()));
          setCards(tfilter);
          break;
       case "Dishes":
         const dishes = JSON.parse(sessionStorage.getItem('dishes'));
         let restaurants = dishes.filter(dish=>dish.DishName.toLowerCase().includes(searchTerm.toLowerCase())).map(dish => dish.RestaurantId);
         console.log("in dishes filter", restaurants)
         let dfilter = initialLoad.filter(card => restaurants.includes(card.RestaurantId));
         console.log("After dishes filter", dfilter)
         setCards(dfilter);
         break;
      }
    }
  }

  const handleSearchReset = () => {
    setSearch('');
  };

  // useEffect(() => {
  //   setFilteredPosts(res1.filter((res1) => res1.RestaurantName === searchValue));
  // }, [res1, searchValue]);


  

  const addFavourite = (cardId) => {
    //console.log("came to favourite", cardId)

    const RestaurantId = cardId;
    const CustomerId = localStorage.getItem("CustomerID")
    console.log("came to favourite", cardId, CustomerId)
    const response = axios.post(`${backendServer}/favourites/${CustomerId}/${RestaurantId}`
    ).then((response) => {
      console.log(response)
    })
      .catch((err) => {
        console.log(err)
      })

  }

  const onView = (card) =>{
    sessionStorage.setItem('currentRestaurant', card.RestaurantId);
    sessionStorage.setItem('currentRestaurantDetails', JSON.stringify(card));
    history.push("/CustomerDashboard");
  }

  return (
    <div>
      <NavbarCustomer onSearch={onSearch} view='customerdashboard' />
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 0,
            pb: 3,
          }}
        >
          {/* <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome Uber-Eats
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Sell your dishes and maximise profits
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Add Dishes</Button>
              <Button variant="outlined">View Orders</Button>
            </Stack>
          </Container> */}
        </Box>
        {/* <input
        type="text"
      
        value={searchValue}
        onChange={handleSearchChange}
      /> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (

              <Grid item key={card} xs={6} sm={3} md={4}>
                <Card
                  sx={{ height: '100%', display: 'block', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '00.25%',
                    }}
                    image={card.Image}
                    alt="random" style={styleimg}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.RestaurantName}
                    </Typography>
                    <Typography>
                      {card.RestaurantDesc}
                    </Typography>
                    <Typography>
                      Phone : {card.PhoneNumber}
                    </Typography>
                    <Typography>
                      Timings : {card.WorkHrsFrom} to {card.WorkHrsTo}
                    </Typography>
                    <Typography>
                      Location : {card.City}
                    </Typography>
                    {/* <Typography>
                      Mode : {card.DeliveryMode}
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" size="small" onClick={() => onView(card)}><b>View</b></Button> 
                    <Button variant="contained" size="small"><FavoriteBorderIcon onClick={() => addFavourite(card.RestaurantId)} style={{ colorFill: "red" }} /> </Button>
                    {/* onClick={() => goToDetails(name)} */}
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* </ThemeProvider> */}
    </div>
  );
}
export default RestaurantView;
