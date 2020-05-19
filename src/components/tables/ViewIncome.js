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
import { loadIncome } from '../../redux/actions/income';
import PropTypes from 'prop-types';
import EditIncome from '../dialogs/EditIncome';


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


const ViewIncome = (props) => {

    const { loadIncome, uiLoading, incomes, history } = props;

    useEffect(() => {
        loadIncome(history, '');
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
                        {incomes.map((income) => (

                            <StyledTableRow key={income}>
                                <StyledTableCell component="th" scope="row">
                                    {capitalizeFLetter(income.description)}
                                </StyledTableCell>
                                <StyledTableCell align="left">{capitalizeFLetter(income.category)}</StyledTableCell>
                                <StyledTableCell align="left">{income.amount} {income.currency}</StyledTableCell>
                                <StyledTableCell align="left">{moment(income.date).format("DD/MM/YYYY hh:mm a").toString()}</StyledTableCell>
                                <StyledTableCell align="left">

                                    <EditIncome income={income} />

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

ViewIncome.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    incomes: PropTypes.array.isRequired,
    loadIncome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    uiLoading: state.income.uiLoading,
    incomes: state.income.incomes,
});

const mapDispatchToProps = {
    loadIncome
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewIncome);