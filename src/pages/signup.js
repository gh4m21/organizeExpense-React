
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const CssTextField = withStyles({
    root: {
        '& label': {
            color: '#43c2d5',
        },
        '& label.Mui-focused': {
            color: '#137988',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#137988',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#137988',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#137988',
            },
        },
    },
})(TextField);

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    brand: {
        color: '#FED766',
    },
    title: {
        color: "#ebe9d9"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#114B5F',
    },
    progess: {
        position: 'absolute',
        color: 'yellow',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#114B5F',
    },
    link: {
        color: '#b9f022'
    },
    inputColor: {
        color: '#e1e1d7',
        backgroundColor: '#114b5f',
    }
});

class signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            country: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: [],
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const newUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            country: this.state.country,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        axios
            .post('/signup', newUserData)
            .then((response) => {
                localStorage.setItem('AuthToken', `${response.data.token}`);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data,
                    loading: false
                });
            });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography className={classes.brand} variant="h6" noWrap>
                            OrganizExpense
                                </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Sign up
					</Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    helperText={errors.firstName}
                                    error={errors.firstName ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    helperText={errors.lastName}
                                    error={errors.lastName ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                    helperText={errors.username}
                                    error={errors.username ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    autoComplete="phoneNumber"
                                    pattern="[7-9]{1}[0-9]{9}"
                                    helperText={errors.phoneNumber}
                                    error={errors.phoneNumber ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country"
                                    helperText={errors.country}
                                    error={errors.country ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.inputColor
                                        }
                                    }}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            disabled={loading ||
                                !this.state.email ||
                                !this.state.password ||
                                !this.state.firstName ||
                                !this.state.lastName ||
                                !this.state.country ||
                                !this.state.username ||
                                !this.state.phoneNumber}
                        >
                            Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2" className={classes.link}>
                                    Already have an account? Sign in
								</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(signup)