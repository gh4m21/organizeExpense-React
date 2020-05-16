import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/user';
import PropTypes from 'prop-types';

import Menu from '../components/Menu';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authMiddleWare } from '../util/auth'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
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
        marginTop: 20
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    toolbar: theme.mixins.toolbar
}));


const Home = (props) => {

    const { history, getUser, user, uiLoading, error } = props;

    const classes = useStyles();

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
    };

    const loadAccountPage = (event) => {
        setComponentClick('Account');
    };

    const loadExpensePage = (event) => {
        setComponentClick('Expense');
    };

    const loadIncomePage = (event) => {
        setComponentClick('Income');
    };

    const logoutHandler = (event) => {
        localStorage.removeItem('AuthToken');
        history.push('/login');
    };

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
                        <Typography variant="h6" noWrap>
                            OrganizExpense
                                </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <center>
                        <Avatar src={user.imageUrl} className={classes.avatar} />
                        <p>
                            {' '}
                            {user.firstName} {user.lastName}
                        </p>
                    </center>
                    <Divider />
                    <List>
                        <ListItem button key="Dashboard" onClick={loadDashboardPage}>
                            <ListItemIcon>
                                {' '}
                                <DashboardIcon />{' '}
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>

                        <ListItem button key="Expense" onClick={loadExpensePage}>
                            <ListItemIcon>
                                {' '}
                                <PaymentIcon />{' '}
                            </ListItemIcon>
                            <ListItemText primary="Expense" />
                        </ListItem>

                        <ListItem button key="Income" onClick={loadIncomePage}>
                            <ListItemIcon>
                                {' '}
                                <AttachMoneyIcon /> {' '}
                            </ListItemIcon>
                            <ListItemText primary="Income" />
                        </ListItem>

                        <ListItem button key="Account" onClick={loadAccountPage}>
                            <ListItemIcon>
                                {' '}
                                <AccountCircleIcon />{' '}
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItem>

                        <ListItem button key="Logout" onClick={logoutHandler}>
                            <ListItemIcon>
                                {' '}
                                <ExitToAppIcon />{' '}
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>

                <div><Menu componentClick={componentClick} /></div>

            </div>
        );

    }

}


Home.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    user: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
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