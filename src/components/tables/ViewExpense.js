import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


import moment from 'moment';

import { connect } from 'react-redux';
import { loadExpense } from '../../redux/actions/expense';
import PropTypes from 'prop-types';
import EditExpense from '../dialogs/EditExpense';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#114b5f',
        color: '#ebe9d9',
    },
    body: {
        fontSize: 14,
        border: 'none',
        color: "#E8E8E8",
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 1000,
        [theme.breakpoints.only('md')]: {
            minWidth: 750,
        },
        [theme.breakpoints.only('sm')]: {
            minWidth: 650,
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 400,
        },
    },
    tableResponsive: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%',
        color: 'yellow',
    },
    button: {
        padding: theme.spacing(0),
        spacing: 0,
        margin: 0,
        color: '#d9534f',
    },
    icon: {
        padding: theme.spacing(0),
        spacing: 0,
        margin: 0,
    }
}));


const ViewExpense = (props) => {

    const { loadExpense, uiLoading, expenses, history } = props;

    useEffect(() => {
        loadExpense(history, '');
    }, []);

    const classes = useStyles();

    const capitalizeFLetter = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    if (uiLoading === true) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
            </main>
        );
    } else {
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Amount</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (

                            <StyledTableRow key={expense}>
                                <StyledTableCell component="th" scope="row">
                                    {capitalizeFLetter(expense.description)}
                                </StyledTableCell>
                                <StyledTableCell align="left">{capitalizeFLetter(expense.category)}</StyledTableCell>
                                <StyledTableCell align="left">{expense.amount} {expense.currency}</StyledTableCell>
                                <StyledTableCell align="left">{moment(expense.date).format("DD/MM/YYYY hh:mm a").toString()}</StyledTableCell>
                                <StyledTableCell align="left">

                                    <EditExpense expense={expense} />

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

ViewExpense.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    expenses: PropTypes.array.isRequired,
    loadExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    uiLoading: state.expense.uiLoading,
    expenses: state.expense.expenses,
});

const mapDispatchToProps = {
    loadExpense
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewExpense);