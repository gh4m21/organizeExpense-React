import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import moment from 'moment';

import { connect } from 'react-redux';
import { loadExpense } from '../../redux/actions/expense';
import PropTypes from 'prop-types';
import EditExpense from '../dialogs/EditExpense';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
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
        width: 1000,
        minWidth: 500,
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
        top: '35%'
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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (

                            <StyledTableRow key={expense}>
                                <StyledTableCell component="th" scope="row">
                                    {capitalizeFLetter(expense.description)}
                                </StyledTableCell>
                                <StyledTableCell align="right">{capitalizeFLetter(expense.category)}</StyledTableCell>
                                <StyledTableCell align="right">{expense.amount} {expense.currency}</StyledTableCell>
                                <StyledTableCell align="right">{moment(expense.date).format("DD/MM/YYYY hh:mm a").toString()}</StyledTableCell>
                                <StyledTableCell align="right">

                                    <EditExpense expense={expense} />

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
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