import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';


const API_BASE_URL = 'https://us-central1-organizexpense.cloudfunctions.net/api';

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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {},
    details: {
        display: 'flex',
    },
    backgroundDetails: {
        backgroundColor: "#015a68",
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    locationText: {
        paddingLeft: '15px',
        color: '#ebe9d9'
    },
    buttonProperty: {
        position: 'absolute',
        top: '50%'
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
    progess: {
        position: 'absolute',
        color: 'yellow',
    },
    uploadButton: {
        marginLeft: '8px',
        margin: theme.spacing(1),
        borderColor: '#b9f022',
        color: '#b9f022',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    submitButton: {
        marginTop: '10px',
        color: '#b9f021',
        backgroundColor: '#114B5F',
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
    },
    inputDisable: {
        color: '#bdbdb3',
        backgroundColor: '#114b5f',
    }
});

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            username: '',
            country: '',
            profilePicture: '',
            uiLoading: true,
            buttonLoading: false,
            imageError: ''
        };
    }

    componentWillMount = () => {
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get(API_BASE_URL + '/user')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    firstName: response.data.userCredentials.firstName,
                    lastName: response.data.userCredentials.lastName,
                    email: response.data.userCredentials.email,
                    phoneNumber: response.data.userCredentials.phoneNumber,
                    country: response.data.userCredentials.country,
                    username: response.data.userCredentials.username,
                    uiLoading: false
                });
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
                }
                console.log(error);
                this.setState({ errorMsg: 'Error in retrieving the data' });
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleImageChange = (event) => {
        this.setState({
            image: event.target.files[0]
        });
    };

    profilePictureHandler = (event) => {
        event.preventDefault();
        this.setState({
            uiLoading: true
        });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        let form_data = new FormData();
        form_data.append('image', this.state.image);
        form_data.append('content', this.state.content);
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .post(API_BASE_URL + '/user/image', form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
                }
                console.log(error);
                this.setState({
                    uiLoading: false,
                    imageError: 'Error in posting the data'
                });
            });
    };

    updateFormValues = (event) => {
        event.preventDefault();
        this.setState({ buttonLoading: true });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const formRequest = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            phoneNumber: this.state.phoneNumber
        };
        axios
            .post(API_BASE_URL + '/user', formRequest)
            .then(() => {
                this.setState({ buttonLoading: false });
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
                }
                console.log(error);
                this.setState({
                    buttonLoading: false
                });
            });
    };

    render() {
        const { classes, ...rest } = this.props;
        if (this.state.uiLoading === true) {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
                </main>
            );
        } else {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Card {...rest} className={clsx(classes.root, classes)}>
                        <CardContent className={classes.backgroundDetails}>
                            <div className={classes.details}>
                                <div>
                                    <Typography className={classes.locationText} gutterBottom variant="h4">
                                        {this.state.firstName} {this.state.lastName}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit"
                                        size="small"
                                        startIcon={<CloudUploadIcon />}
                                        className={classes.uploadButton}
                                        onClick={this.profilePictureHandler}
                                    >
                                        Upload Photo
									</Button>
                                    <input type="file" onChange={this.handleImageChange} style={{ color: '#e1e1d7' }} />

                                    {this.state.imageError ? (
                                        <div className={classes.customError}>
                                            {' '}
											Wrong Image Format || Supported Format are PNG and JPG
                                        </div>
                                    ) : (
                                            false
                                        )}
                                </div>
                            </div>
                            <div className={classes.progress} />
                        </CardContent>

                    </Card>

                    <br />
                    <Card {...rest} className={clsx(classes.root, classes)}>
                        <form autoComplete="off" noValidate>

                            <CardContent className={classes.backgroundDetails}>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <CssTextField
                                            fullWidth
                                            label="First name"
                                            margin="dense"
                                            name="firstName"
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputColor
                                                }
                                            }}
                                            value={this.state.firstName}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <CssTextField
                                            fullWidth
                                            label="Last name"
                                            margin="dense"
                                            name="lastName"
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputColor
                                                }
                                            }}
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            margin="dense"
                                            name="email"
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputDisable
                                                }
                                            }}
                                            disabled={true}
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <CssTextField
                                            fullWidth
                                            label="Phone Number"
                                            margin="dense"
                                            name="phone"
                                            type="number"
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputColor
                                                }
                                            }}
                                            disabled={false}
                                            value={this.state.phoneNumber}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="User Name"
                                            margin="dense"
                                            name="userHandle"
                                            disabled={true}
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputDisable
                                                }
                                            }}
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <CssTextField
                                            fullWidth
                                            label="Country"
                                            margin="dense"
                                            name="country"
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    input: classes.inputColor
                                                }
                                            }}
                                            value={this.state.country}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>

                        </form>
                    </Card>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={classes.submitButton}
                        onClick={this.updateFormValues}
                        disabled={
                            this.state.buttonLoading ||
                            !this.state.firstName ||
                            !this.state.lastName ||
                            !this.state.country ||
                            !this.state.phoneNumber
                        }
                    >
                        Save details
						{this.state.buttonLoading && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                </main>
            );
        }
    }
}

export default withStyles(styles)(Account);