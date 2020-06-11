import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/user';
import PropTypes from 'prop-types';

import Menu from '../components/Menu';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from '../util/auth'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#114B5F',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#114B5F',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    avatar: {
        height: 100,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
        marginTop: 20,
    },
    avatarName: {
        color: '#E8E8E8',
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%',
        color: 'yellow',
    },
    title: {
        color: '#FED766',
    },
    menuItem: {
        color: '#b9f022',
    },
    menu: {
        backgroundColor: '#114B5F',
    },
    toolbar: theme.mixins.toolbar
}));


const Home = (props) => {

    const { history, getUser, user, uiLoading, error, window } = props;

    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [componentClick, setComponentClick] = useState('');
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        country: '',
        phoneNumber: '',
        profilePicture: '',
        uiLoading: true,
        imageLoading: false
    });

    const menuToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        getUser(history);
        setUserDetails({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            country: user.country,
            uiLoading: false,
            profilePicture: user.imageUrl
        });
    }, []);


    const loadDashboardPage = (event) => {
        setComponentClick('Dashboard');
        setMobileOpen(false);
    };

    const loadAccountPage = (event) => {
        setComponentClick('Account');
        setMobileOpen(false);
    };

    const loadExpensePage = (event) => {
        setComponentClick('Expense');
        setMobileOpen(false);
    };

    const loadIncomePage = (event) => {
        setComponentClick('Income');
        setMobileOpen(false);
    };

    const logoutHandler = (event) => {
        localStorage.removeItem('AuthToken');
        authMiddleWare(history);
        //window.location.href = '/login';
    };


    const drawer = (
        <div >
            <div className={classes.toolbar} />
            <Divider />
            <center>
                <Avatar src={user.imageUrl} className={classes.avatar} />
                <p className={classes.avatarName}>
                    {' '}
                    {user.firstName} {user.lastName}
                </p>
            </center>
            <Divider />
            <List className={classes.menuItem}>
                <ListItem button key="Dashboard" onClick={loadDashboardPage}>
                    <ListItemIcon className={classes.menuItem}>
                        {' '}
                        <EqualizerIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button key="Expense" onClick={loadExpensePage}>
                    <ListItemIcon className={classes.menuItem}>
                        {' '}
                        <PaymentIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="Expense" />
                </ListItem>

                <ListItem button key="Income" onClick={loadIncomePage}>
                    <ListItemIcon className={classes.menuItem}>
                        {' '}
                        <AttachMoneyIcon /> {' '}
                    </ListItemIcon>
                    <ListItemText primary="Income" />
                </ListItem>

                <ListItem button key="Account" onClick={loadAccountPage}>
                    <ListItemIcon className={classes.menuItem}>
                        {' '}
                        <AccountCircleIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>

                <ListItem button key="Logout" onClick={logoutHandler}>
                    <ListItemIcon className={classes.menuItem}>
                        {' '}
                        <ExitToAppIcon />{' '}
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );


    const container = window !== undefined ? () => window().document.body : undefined;


    if (uiLoading === true) {
        return (
            <div className={classes.root}>
                {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={menuToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            OrganizExpense
                                </Typography>
                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden mdUp implementation="css">

                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={menuToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>

                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>

                </nav>

                <div>
                    <Menu componentClick={componentClick} />
                </div>

            </div>
        );

    }

}


Home.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    user: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    window: PropTypes.func,
};

const mapStateToProps = (state) => ({
    uiLoading: state.user.uiLoading,
    user: state.user.user,
    error: state.user.error,
});

const mapDispatchToProps = {
    getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
