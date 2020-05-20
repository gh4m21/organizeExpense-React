import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ViewTotal from './cards/ViewTotal'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const Dashboard = props => {

    const classes = useStyles();
    return (
        <ViewTotal />
    )
}


export default (Dashboard);