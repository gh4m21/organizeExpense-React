import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { loadExpense } from '../../redux/actions/expense';
import { loadIncome } from '../../redux/actions/income';
import PropTypes from 'prop-types';
import { getTotalExpense, getTotalIncome, getTotalBill, getEconomy } from '../../util/statistic';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(10),
        alignItems: 'center',
    },
    card: {
        minWidth: 240,
        backgroundColor: '#015a68',
    },
    cardAction: {
        backgroundColor: '#114b5f',
    },
    cover: {
        width: 151,
        height: 50,
    },
    title: {
        fontSize: 20,
        color: '#ebe9d9'
    },
    number: {
        fontSize: 16,
    },
    button: {
        color: '#b9f021',
        textAlign: 'center',
        alignItems: 'center',
    }
}));

const ViewTotal = props => {

    useEffect(() => {
        loadExpense(history, '');
        loadIncome(history, '');
    }, []);


    const { loadExpense, uiLoading, expenses, history, incomes, loadIncome } = props;
    const classes = useStyles();

    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setIncome] = useState(0);
    const [totalBill, setBill] = useState(0);
    const [economy, setEconomy] = useState(0);

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card className={classes.card} >
                        <CardContent >
                            <Typography className={classes.title}>
                                Total Expense
                                </Typography>
                            <PaymentIcon style={{ fontSize: 50, color: '#d9534f' }} />
                            <Typography className={classes.number} style={{ color: '#d9534f' }}>
                                {getTotalExpense(expenses)} {' $ RD'}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>
                                Total Income
                                </Typography>
                            <AccountBalanceIcon style={{ fontSize: 50, color: '#5cb85c' }} />
                            <Typography className={classes.number} style={{ color: '#5cb85c' }}>
                                {getTotalIncome(incomes)} {' $ RD'}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>
                                Total Bill
                                </Typography>
                            <ReceiptIcon style={{ fontSize: 50, color: '#f0ad4e' }} />
                            <Typography className={classes.number} style={{ color: '#f0ad4e' }}>
                                {getTotalBill(expenses)} {' $ RD'}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} >
                                Economy
                                </Typography>
                            <AccountBalanceWalletIcon style={{ fontSize: 50, color: '#0275d8' }} />
                            <Typography className={classes.number} style={{ color: '#0275d8' }}>
                                {getEconomy(getTotalExpense(expenses), getTotalIncome(incomes))} {' $ RD'}
                            </Typography>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

ViewTotal.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    expenses: PropTypes.array.isRequired,
    loadExpense: PropTypes.func.isRequired,
    incomes: PropTypes.array.isRequired,
    loadIncome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    uiLoading: state.expense.uiLoading,
    expenses: state.expense.expenses,
    incomes: state.income.incomes,
});

const mapDispatchToProps = {
    loadExpense,
    loadIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTotal);