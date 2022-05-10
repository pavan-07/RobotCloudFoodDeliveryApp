import React, { useState, UseEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import logo from '../images/uber-eats.svg';
//import newlogo from '../images/UberEATS.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import LandingPage from './LandingPage';

import { DropdownMenu } from 'react-bootstrap-dropdown-menu';

import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  List,
  Box,
  InputLabel
} from '@material-ui/core';
import {
  ArrowBack,
  HistorySharp,
  Home
} from '@material-ui/icons';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import avatar from '../images/avatar.svg';
import { Link } from 'react-router-dom';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
//import uberlogo from '../images/uberlogo.svg';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import props from 'prop-types';
import PropTypes from 'prop-types';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Select, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from "@material-ui/core/Grid";
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';

import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import backendServer from '../Config'
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Badge } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  FormControl: {
    minWidth: 130,
    alignText: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    paddingTop: '64px',
    background: '#7ac356',
    height: '100%'
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    marginBottom: '4rem',
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: '#222'
  }
}));

//   search bar styles



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  right: '5',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',

  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// search bar style ends

//added on 03-10-2021
const searchDashBoard = [{
  key: 'restaurant',
  value: 'Restaurant'
}, {
  key: 'dish',
  value: 'Dishes'
}, {
  key: 'location',
  value: 'Location'
}, {
  key: 'deliverytype',
  value: 'Delivery Type'
}]

const searchRestaurant = [{
  key: 'dish',
  value: 'Dishes'
}, {
  key: 'type',
  value: 'Dish Type'
},
{
  key: 'category',
  value: 'Category'
}]


//added on 03-10-2021


//const dispatch = useDispatch();


const routepage = [
  {
    listIcon: <LandingPage />,
    listText: 'Dashboard',
    listPath: '/LandingPage'
  }
]

const logout1 = () => {

  useDispatch.dispatch(logout('', ''));


}

const menuItems = [
  {
    listIcon: <FaceIcon />,
    listText: 'Profile',
    listPath: '/UserProfile'
  },
  {
    listIcon: <Home />,
    listText: 'Restaurant',
    listPath: '/RestaurantView'
  },
  {
    listIcon: <ShoppingCartIcon />,
    listText: 'Orders',
    listPath: '/CustomerOrder'
  },
  {
    listIcon: <FavoriteIcon />,
    listText: 'Favourites',
    listPath: '/Favourites'
  },
  {
    listIcon: <LogoutIcon onClick={logout1} />,
    listText: 'Logout',
    listPath: '/'
  }
]




const styleimg = {
  display: 'block',
  margin: 'auto'
}

const stylebg = {
  background: '#6f42c1'
}

const Navbar = (props) => {

  // added on 03-10-2021

  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false
  });

  const [cart, setCart] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [multipleOrderDialog, setMultipleOrderDialog] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState('');
  const [newRestaurant, setNewRestaurant] = useState('');
  const [searchString, setSearchString] = useState('');
  const [searchBy, setSearchBy] = useState('Restaurant');
  const [orderOption, setOrderOption] = useState('Delivery');
  const [restaurantMode, setRestaurantMode] = useState('');
  const [deliveryModes, setDeliveryModes] = useState([]);

  useEffect(async () => {
    let currentCart = JSON.parse(sessionStorage.getItem('currentCart')) || [];
    setCart(currentCart);
    let restaurantMode = sessionStorage.getItem('mode');
    if (restaurantMode == 'Pick-up') {
      setDeliveryModes(["Pick-up"]);
    } else if (restaurantMode == 'Delivery') {
      setDeliveryModes(["Delivery"]);
    } else {
      setDeliveryModes(["Delivery", "Pick-up"]);
    }
    if (props.view === 'customerrestaurant')
      setSearchBy('Dishes')
  }, []);

  const persistCartOnSession = (cart) => {
    sessionStorage.setItem('checkoutCart', JSON.stringify(cart));
  }

  const showNewOrderMessage = (currentRestaurant, newRestaurant) => {
    console.log(currentRestaurant, newRestaurant);
    return `Your cart contains orders from restaurant ${currentRestaurant}. Create a new order to add items from restaurant ${newRestaurant}`;
  }

  const onAddToCart = (dish) => {
    if (cart.length != 0 && dish.RestaurantId != cart[0].RestaurantId) {
      setCurrentRestaurant(cart[0].RestaurantId);
      setNewRestaurant(dish.RestaurantId);
      setMultipleOrderDialog(true);
      setTempCart([dish]);
      return;
    }
    let newCart = [...cart, dish];
    let index = cart.findIndex(item => item.DishId === dish.DishId);
    if (index == -1) {
      newCart = [...cart, { ...dish, Quantity: 1 }]
    } else {
      newCart = [...cart];
      newCart[index].Quantity++;
    }
    setCart(newCart);
    persistCartOnSession(newCart);
    console.log("cart", newCart);
  }

  const onRemoveFromCart = (dish) => {
    let newCart = [...cart]
    let index = newCart.findIndex(item => item.DishId === dish.DishId)
    if (index == -1)
      return;
    newCart[index].Quantity > 1 ? newCart[index].Quantity-- : newCart.splice(index, 1);
    if (newCart.length == 0)
      setOpenCart(false);
    setCart(newCart)
    persistCartOnSession(newCart);
    console.log("cart", newCart);
  }

  const getTotalPrice = () => {
    return cart.reduce((price, item) => price + item.Price * item.Quantity, 0);
  }

  const onViewCart = () => {
    let currentCart = JSON.parse(sessionStorage.getItem('currentCart')) || [];
    setCart(currentCart);
    let currentRestaurantDetails = JSON.parse(sessionStorage.getItem('currentRestaurantDetails'));
    setRestaurantMode(currentRestaurantDetails.Mode);
    if (currentCart.length) {
      setOpenCart(true);
    } else {
      alert("Please add items to your cart");
    }
  }

  const onCheckOut = () => {
    persistCartOnSession(cart);
    sessionStorage.removeItem('currentCart');
    setCart([]);
    sessionStorage.setItem('mode', orderOption);
    history.push("/CustomerCheckOut")
  }


  const getNumberOfItemsInCart = () => {
    let cart = JSON.parse(sessionStorage.getItem('currentCart')) || [];
    let noOfItems = cart.reduce((quantity, item) => quantity + item.Quantity, 0);
    return noOfItems;
  }


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onSearchCriteriaChange = async (e) => {
    setSearchBy(e.target.value);
    if (e.target.value == "Dishes") {
      const country = sessionStorage.getItem('country');
      const city = sessionStorage.getItem('city');
      const url = `${backendServer}/Alldishes`;
      const response = await axios.get(url);
      sessionStorage.setItem('dishes', JSON.stringify(response.data));
    }
  }
  // added on 03-10-2021





  const [state2, setState2] = useState({
    left: false
  })

  const [value, setValue] = useState('');

  const toggleSlider = (slider, open) => () => {
    setState({ ...state2, [slider]: open });
  };

  const sideList = slider => (
    <Box component='div' style={stylebg}
      className={classes.menuSliderContainer}
      onClick={toggleSlider(slider, false)}>

      {/* <Avatar className={classes.avatar} src={avatar} alt='' /> */}
      {/* <img src={logo} width={'120'} height={'80'} style={styleimg} alt='' /> */}
      <h4>Robot Cloud Food Delivery Application</h4>
      <Divider />
      <List>
        {menuItems.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText className={classes.listItem} primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );


  // dropdown 
  // const [value, setValue] = useState('')

  // const handleBtnChange = e => setValue(e.target.value)

  //console.log("filter Value", value)



  const [state1, setState1] = React.useState({

    checkedB: true


  });

  const handleChange = name => event => {
    setState1({ ...state1, [name]: event.target.checked });

    console.log("statevalue", state1.checkedB)
  };

  console.log(state1)


  const [age, setAge] = React.useState('');

  const handleProfileChange = (event) => {
    setAge(event.target.value);
    console.log(age)
  }

  const style = {
    background: '#bdbdbd'
  };

  return (
    <>
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" >
            <Toolbar style={{ display: 'flex', width: '100%' }}>
              <MobileeRightMenuSlider open={state.left}
                onClose={toggleSlider('left', false)}
                anchor='left' > {sideList('left')} </MobileeRightMenuSlider> <
                  IconButton onClick={toggleSlider('left', true)} >
                <DehazeIcon style={
                  { color: 'white' }} />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {/* <a href="/"><img src={logo} width={'120'} height={'80'} alt='' /> </a> */}
                <h4>Robot Cloud Food Delivery Application</h4>

              </Typography>
              {/* {flag ?<>  */}

              {/* <FormGroup row style={{
                display: "flex",
                paddingRight: "700px",
                justifyContent: "center"
              }}  >
                <FormControlLabel
                  control={
                    <>
                    </>
                  }

                  label="Pick-Up"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedB}
                      onChange={handleChange('checkedB')}
                      value="checkedB"
                      color="Black"
                    />
                  }
                  label="Delivery"
                />
              </FormGroup> */}

              <Box sx={{ flexGrow: 1 }} display="flex" alignItems='left'>
                <>
                  <TextField
                    required
                    fullWidth
                    name="searchCriteria"
                    label="Search By"
                    value={searchBy}
                    style={{ width: '30%', textAlign: 'left' }}
                    autoComplete="Search By"
                    onChange={e => { onSearchCriteriaChange(e); }}
                    placeholder='Search By'
                    select
                  >
                    {props.view === 'customerdashboard' && searchDashBoard.map((option) => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                    {props.view === 'customerrestaurant' && searchRestaurant.map((option) => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                    {/* {props.view === 'customerrestaurant' && searchRestaurant.map((option) => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))} */}

                  </TextField>
                  <Search style={{ width: '65%' }} onChange={(event) => props.onSearch(searchBy, event.target.value)}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search.."
                      inputProps={{ 'aria-label': 'search', textAlign: 'center' }}
                      fullWidth
                      type="text"
                      margin="normal"
                    />
                  </Search>
                </>
              </Box>

              {props.view === 'OrderPage' && <>{!state1.checkedB ?
              
              

                <FormControl className={classes.FormControl} style={{
                  display: "flex",
                  paddingRight: "20px",
                  justifyContent: "center",
                }}>
                  <InputLabel>Order Filter</InputLabel>
                  <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                    <MenuItem value="All Orders">All Orders</MenuItem>
                    <MenuItem value="Order Received">Order Received</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Pick Up Ready">Pick Up Ready</MenuItem>
                    <MenuItem value="Picked Up">Picked Up</MenuItem>
                  </Select>
                </FormControl>

                : (<FormControl className={classes.FormControl} style={{
                  display: "flex",
                  paddingRight: "20px",
                  justifyContent: "center",
                }}>
                  <InputLabel>Order Filter</InputLabel>
                  <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                    <MenuItem value="All Orders">All Orders</MenuItem>
                    <MenuItem value="Order Received">Order Received</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="On The Way">On The Way</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>

                  </Select>
                </FormControl>)
              }
              </>
                
                }

              {/* testing */}


              {/* testing */}

              {/* {!state1.checkedB ?

                <FormControl className={classes.FormControl} style={{
                  display: "flex",
                  paddingRight: "20px",
                  justifyContent: "center",
                }}>
                  <InputLabel>Order Filter</InputLabel>
                  <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                    <MenuItem value="All Orders">All Orders</MenuItem>
                    <MenuItem value="Order Received">Order Received</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Pick Up Ready">Pick Up Ready</MenuItem>
                    <MenuItem value="Picked Up">Picked Up</MenuItem>
                  </Select>
                </FormControl>

                : (<FormControl className={classes.FormControl} style={{
                  display: "flex",
                  paddingRight: "20px",
                  justifyContent: "center",
                }}>
                  <InputLabel>Order Filter</InputLabel>
                  <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                    <MenuItem value="All Orders">All Orders</MenuItem>
                    <MenuItem value="Order Received">Order Received</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="On The Way">On The Way</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>

                  </Select>
                </FormControl>)} */}

              {/* Filter button */}




              {/* Filter Button */}
              {/* <Search
            onChange={(event) => props.handleSearch(event)}
          >
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What are you craving?"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                <FormControlLabel
                  control={
                    <>
                    </>
                  }

                  label="Pick-Up"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedB}
                      onChange={handleChange('checkedB')}
                      value="checkedB"
                      color="Black"
                    />
                  }
                  label="Delivery"
                />


                <IconButton aria-label="view cart" onClick={onViewCart}>
                  <Badge badgeContent={getNumberOfItemsInCart()} color="primary">
                    <ShoppingCartIcon />
                  </Badge>

                </IconButton>
              </Box>

              <a href="/UserProfile"> <AccountCircle ></AccountCircle></a>
              {/* </a> */}
              {/* </> : <></>} */}
            </Toolbar>
          </AppBar>
        </Box>
      </div>



      <div>
        <Dialog open={openCart} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Order Summary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Here's what your cart looks like
            </DialogContentText>
            <List disablePadding>
              {cart.map((item) => (
                <ListItem key={item.DishId} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={item.DishName} />
                  <IconButton onClick={() => { onRemoveFromCart(item) }} aria-label="remove from cart">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography variant="body2">{item.Quantity} nos</Typography>
                  <IconButton onClick={() => { onAddToCart(item) }} aria-label="add to cart">
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>${item.Price} x {item.Quantity} nos = ${item.Price * item.Quantity}</Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ${getTotalPrice()}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Order Option" />
                <TextField
                  required
                  fullWidth
                  name="mode"
                  value={orderOption}
                  style={{ width: '25%' }}
                  onChange={(e) => setOrderOption(e.target.value)}
                  autoComplete="delivery"
                  defaultValue="pickup"
                  select
                >
                  {deliveryModes.map((mode) => (
                    <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                  ))}
                </TextField>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onCheckOut()} variant="contained" color="primary">
              Check Out
            </Button>
            <Button onClick={() => setOpenCart(false)} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

Navbar.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func
}

export default Navbar;