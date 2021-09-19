
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
import  food  from '../../images/Food10.jpeg';
import  food1  from '../../images/Food1.jpeg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendServer from '../../Config'
//import json from 'json5'

import Navbar from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
//import Login from '../Login';

var x = new Map();
    var y = new Map();
    var v = new Map();
    
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const styleimg ={
    display: 'block',
    margin: 'auto',
    height:'50',
     width:'25'
}

export default function Restaurant () {

  const [name, getName] = useState('');
  const [description, getDescription] = useState('');
  const [imageURL, getImageUrl] = useState('');
  const [res1, setRes1] = useState([]);
  //const [res1, getRes1] = useState('');



  useEffect(async () => {

    console.log("use effect");
  
    const response = await axios.get(`${backendServer}/Restaurant`);
  
  //const res = Arrays.from(response)
  // const results = JSON.parse(response);
  console.log("Hello1", response)

  setRes1(response.data);
  
  //getRes1({res1: response.data})
  //const data = await response.json();
  //console.log(res2.data);
     
    console.log("Hello", res1)
   // console.log("isss ",res1);
   getName(response.data[2].RestauantName);
   getDescription(response.data[2].RestaurantDesc);
   getImageUrl(response.data[2].Image)
 
    // c = new Map(Object.entries(res1));
    // console.log("ywuidjokl ",new Map(Object.entries(res1)));
    // c.get('res1');
    // d = new Map(Object.entries(c.get('res1')));
    // for (const [key, value] of d.entries()) {
    //   console.log("key is ",key, " value is ",value);
   // console.log((new Map(Object.entries((new Map(Object.entries(res1))).get('res1')))).get('0'));
    //  x= (new Map(Object.entries(res1)).get('res1'));
    //  v = new Map(Object.entries((new Map(Object.entries(res1))).get('res1')));
    //  y= (new Map(Object.entries(x)));
    // console.log((new Map(Object.entries(y.get("0"))).get("RestauantName")));
    // console.log((new Map(Object.entries(y.get("0"))).get("RestauantName")));
    // }
    
   }, []);



  return (
      <>
      <Navbar />
    <ThemeProvider theme={theme}>
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
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {res1.map((card) =>(
        
              <Grid item key={card} xs={6} sm={3} md={4}>
                
                {/* {Array.from({ length: (new Map(Object.entries((new Map(Object.entries(res1))).get('res1')))).size }).map((nam, idx) => ( */}
                
                <Card
                  sx={{ height: '100%', display: 'block', flexDirection: 'column' }}>
                    {/* <li>{(new Map(Object.entries((new Map(Object.entries(new Map(Object.entries(res1)).get('res1')))).get(idx.toString()))).get("RestauantName"))}</li> */}
                    {/* <li>{idx}</li> */}
                  
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '00.25%',
                    }}
                    image={card.Image}  //(new Map(Object.entries((new Map(Object.entries(new Map(Object.entries(res1)).get('res1')))).get(idx.toString()))).get("Image"))
                    alt="random" style={styleimg}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.RestauantName}
                    </Typography>
                    <Typography>
                     {card.RestaurantDesc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>      
                                              
                </Card>   
               
              </Grid>
               ))}   
               
                  
            
                  
          </Grid>
        </Container>
      </main>
      
    </ThemeProvider>
    </>
  );
}

//export default Restaurant;


   {/* {Object.entries(res1).map(([result, i], j) => ( */}
             {/* {Object.entries(d).map(([result, i], j) => (  */}