import React, {
    Fragment,
    useState
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { addExpense } from '../../redux/actions/expense';
import { loadCategoryExpense } from '../../redux/actions/categoryExpense';
import { loadCurrency } from '../../redux/actions/currency';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {
        minWidth: 470
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    dialogeStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: '#000000',
    },
    iconEdit: {
        color: '#0275d8',
    },
    textField: {
        spacing: theme.spacing(0),
        height: 10,
    }
}));


const AddExpense = (props) => {

    const {
        addExpense,
        loadCategoryExpense,
        loadCurrency,
        currencies,
        categoryExpense,
        history,
    } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        description: '',
        category: '',
        amount: '',
        currency: '',
    });

    const handleOpen = () => {
        setOpen(true);
        loadCategoryExpense();
        loadCurrency();
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const expenseData = {
            description: data.description,
            category: data.category,
            amount: data.amount,
            currency: data.currency,
        };

        addExpense(history, expenseData);
        handleClose();
    };

    const capitalizeFLetter = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    return (
        <Fragment>

            <Fab
                color="primary"
                title="Add Expense"
                className={classes.floatingButton}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add your Expense</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            variant="outlined"
                            fullWidth
                            rows="3"
                            type="text"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            margin="normal"
                            size="small"
                            value={data.description}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            name="category"
                            variant="outlined"
                            value={data.category}
                            onChange={handleChange}
                            label="Category"
                            rows="3"
                            fullWidth
                            margin="normal"
                            size="small"
                        >
                            {categoryExpense.map((category) => (
                                <MenuItem key={category.description} value={category.description}>
                                    {capitalizeFLetter(category.description)}
                                </MenuItem>
                            ))}

                        </TextField>

                        <TextField
                            variant="outlined"
                            fullWidth
                            rows="3"
                            type="number"
                            label="Amount"
                            name="amount"
                            margin="normal"
                            size="small"
                            value={data.amount}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            name="currency"
                            variant="outlined"
                            value={data.currency}
                            onChange={handleChange}
                            label="Currency"
                            rows="3"
                            fullWidth
                            margin="normal"
                            size="small"
                        >
                            {currencies.map((currency) => (
                                <MenuItem key={currency.description} value={currency.description}>
                                    {capitalizeFLetter(currency.description)}
                                </MenuItem>
                            ))}
                        </TextField>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
            </Button>
                    <Button onClick={handleSubmit}>
                        Save
            </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

AddExpense.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    categoryExpense: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    addExpense: PropTypes.func.isRequired,
    loadCategoryExpense: PropTypes.func.isRequired,
    loadCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.expense.errors,
    categoryExpense: state.categoryExpense.categoryExpense,
    currencies: state.currency.currencies,
});

const mapDispatchToProps = {
    addExpense,
    loadCategoryExpense,
    loadCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);