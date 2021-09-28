
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const styleimg = {
  display: 'block',
  margin: 'auto',
  height: '50',
  width: '25'
}

const RestaurantView = ()=> {
  const history = useHistory();

  const [name, getName] = useState('');
  const [description, getDescription] = useState('');
  const [imageURL, getImageUrl] = useState('');
  const [res1, setRes1] = useState([]);
  const [il,setIl] = useState([]);
  //const [res1, getRes1] = useState('');

  const [searchValue, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const onSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value);
    let searchTerm = event.target.value;
    console.log(res1);
    if(searchTerm==''){
      setRes1(il);
      return;
    }
    if(res1.length != 0)
    {
    let filter_1 = res1.filter(res => res.RestaurantName!=null && res.RestaurantName.includes(searchTerm));
    setRes1(filter_1);
    }
  };

  const handleSearchReset = () => {
    setSearch('');
  };

  useEffect(() => {
    setFilteredPosts(res1.filter((res1) => res1.RestaurantName === searchValue));
  }, [res1, searchValue]);

console.log("Hello", filteredPosts);

  useEffect(async () => {

    console.log("use effect");

    const response = await axios.get(`${backendServer}/Restaurant`);

    //const res = Arrays.from(response)
    // const results = JSON.parse(response);
    console.log("Hello1", response)

    setRes1(response.data);
    setIl(response.data);

    //getRes1({res1: response.data})
    //const data = await response.json();
    //console.log(res2.data);

    console.log("Hello", res1)
    // console.log("isss ",res1);
    getName(response.data[2].RestaurantName);
    getDescription(response.data[2].RestaurantDesc);
    getImageUrl(response.data[2].Image)
  }, []);

 const addFavourite =  (cardId) =>{
   //console.log("came to favourite", cardId)

   const RestaurantId = cardId;
   const CustomerId = localStorage.getItem("CustomerID")
   console.log("came to favourite", cardId, CustomerId )


   const response = axios.post(`${backendServer}/favourites/${CustomerId}/${RestaurantId}`
   ).then((response) =>{
     console.log(response)
   })
   .catch((err) =>{
     console.log(err)
   })

 }

  return (
    <div>
      <Navbar handleSearch = {onSearch} />
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
              {res1.map((card) => (

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
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button> <FavoriteBorderIcon onClick={() =>addFavourite(card.RestaurantId)} style={{ color: "red" }} /> 
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
