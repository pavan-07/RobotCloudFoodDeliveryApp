import React, {useState, UseEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/uber-eats.svg';
import newlogo from '../images/UberEATS.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import LandingPage from './LandingPage';
import {
    ListItemIcon,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    List,
    Box
} from '@material-ui/core';
import {
    ArrowBack,
    Home
} from '@material-ui/icons';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import avatar from '../images/avatar.svg';
import {Link} from 'react-router-dom';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import uberlogo from '../images/uberlogo.svg';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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


  const routepage = [
    {
        listIcon: <LandingPage />,
        listText: 'Dashboard',
        listPath: '/LandingPage'
    }
]

const menuItems = [
    {
        listIcon: <Home />,
        listText: 'Sign In',
        listPath: '/LandingPage'
    },
    {
        listIcon: <Home />,
        listText: 'SignUp',
        listPath: '/Register'
    },
    {
        listIcon: <Home />,
        listText: 'Create Business Account',
        listPath: 'RegisterRestaurant/'
    },
    {
        listIcon: <Home />,
        listText: 'Sign in for Business Account',
        listPath: '/LandingPage'
    },
]
const styleimg = {
    display: 'block',
    margin: 'auto'
  }

  const stylebg = {
    background: '#6f42c1'
  }

const Navbar = ()=> {
    const classes = useStyles();

    const [state, setState] = useState({
        left: false
    })

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    };

    const sideList = slider => (
        <Box component='div' style={stylebg}
            className={classes.menuSliderContainer}
            onClick={toggleSlider(slider, false)}>
                
            {/* <Avatar className={classes.avatar} src={avatar} alt='' /> */}
          <img src={logo} width={'120'} height={'80'} style={styleimg} alt='' />
            
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

    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <MobileeRightMenuSlider open = { state.left }
        onClose = { toggleSlider('left', false) }
        anchor = 'left' > { sideList('left') } </MobileeRightMenuSlider> <
        IconButton onClick = { toggleSlider('left', true) } >
        <DehazeIcon style = {
            { color: 'white' } }/>
         </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            </IconButton>
        <Typography variant="h6" className={classes.title}>
       <a href="/"><img src={logo} width={'120'} height={'80'} alt='' /> </a>
          </Typography>
          {/* {flag ?<>  */}
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What are you craving?"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {/* <Button color="inherit" component={RouterLink} to="/LandingPage">Login</Button> */}
         <a href="/UserProfile"> <AccountCircle ></AccountCircle></a>
          {/* </> : <></>} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar;