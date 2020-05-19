import React, {
    Fragment,
    useState
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { editExpense } from '../../redux/actions/expense';
import { loadCategoryExpense } from '../../redux/actions/categoryExpense';
import { loadCurrency } from '../../redux/actions/currency';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


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

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: '#006773',
    },
    toolbar: theme.mixins.toolbar,
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    title: {
        backgroundColor: '#114b5f',
        color: '#ebe9d9',
    },
    submitButton: {
        color: '#b9f022',
        textAlign: 'center',
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: theme.spacing(3)
    },
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
        top: '35%',
        color: 'yellow',
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
        color: '#b9f021',
    },
    textField: {
        spacing: theme.spacing(0),
        height: 10,
    },
    dialogBody: {
        backgroundColor: "#015a68",
    },
    actionDialog: {
        backgroundColor: "#114b5f",
    },
    link: {
        color: "#b9f021",
    },
    inputColor: {
        color: '#e1e1d7',
        backgroundColor: '#114b5f',
    }
}));


const EditExpense = (props) => {

    const {
        expense,
        editExpense,
        loadCategoryExpense,
        loadCurrency,
        currencies,
        categoryExpense,
        history,
    } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(expense);

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
            username: expense.username,
            idExpense: expense.idExpense,
            date: expense.date,
        };

        editExpense(history, expenseData);
        handleClose();
    };

    const capitalizeFLetter = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    return (
        <Fragment >

            <IconButton
                className={classes.iconEdit}
                title="Edit Expense"
                onClick={handleOpen}
                size="small"
            >
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle className={classes.title}>Edit your Expense</DialogTitle>
                <DialogContent className={classes.dialogBody}>
                    <form>
                        <CssTextField
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.inputColor
                                }
                            }}
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

                        <CssTextField
                            select
                            InputProps={{
                                classes: {
                                    input: classes.inputColor
                                }
                            }}
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

                        </CssTextField>

                        <CssTextField
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                classes: {
                                    input: classes.inputColor
                                }
                            }}
                            rows="3"
                            type="number"
                            label="Amount"
                            name="amount"
                            margin="normal"
                            size="small"
                            value={data.amount}
                            onChange={handleChange}
                        />
                        <CssTextField
                            select
                            InputProps={{
                                classes: {
                                    input: classes.inputColor
                                }
                            }}
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
                        </CssTextField>

                    </form>
                </DialogContent>
                <DialogActions className={classes.actionDialog}>
                    <Button className={classes.link} onClick={handleClose}>
                        Cancel
            </Button>
                    <Button className={classes.link} onClick={handleSubmit}>
                        Save
            </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

EditExpense.prototype = {
    uiLoading: PropTypes.bool.isRequired,
    categoryExpense: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    editExpense: PropTypes.func.isRequired,
    loadCategoryExpense: PropTypes.func.isRequired,
    loadCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.expense.errors,
    categoryExpense: state.categoryExpense.categoryExpense,
    currencies: state.currency.currencies,
});

const mapDispatchToProps = {
    editExpense,
    loadCategoryExpense,
    loadCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);