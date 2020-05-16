import {
    EXPENSE_FETCH_REQUEST,
    EXPENSE_FETCH_SUCCESS,
    EXPENSE_FETCH_FAIL,
    EDIT_EXPENSE_REQUEST,
    EDIT_EXPENSE_FAIL,
    EDIT_EXPENSE_SUCCESS,
    ADD_EXPENSE_REQUEST,
    ADD_EXPENSE_FAIL,
    ADD_EXPENSE_SUCCESS,
} from '../actions/Constants';
import axios from 'axios';
import { authMiddleWare } from '../../util/auth';


export const loadExpense = (history, expenses) => dispatch => {

    dispatch({
        type: EXPENSE_FETCH_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    if (expenses === '') { //load all expense
        axios
            .get('/expense')
            .then((response) => {
                dispatch({
                    type: EXPENSE_FETCH_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: EXPENSE_FETCH_FAIL,
                });
                console.log('error');
            });

    } else { //load one expense
        axios
            .get(`/expense/${expenses.idExpense}`)
            .then((response) => {
                dispatch({
                    type: EXPENSE_FETCH_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: EXPENSE_FETCH_FAIL,
                    payload: error
                });
                console.log('error');
            });

    }

}

export const editExpense = (history, expenses) => dispatch => {
    dispatch({
        type: EDIT_EXPENSE_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    const userExpense = {
        description: expenses.description,
        category: expenses.category,
        amount: expenses.amount,
        currency: expenses.currency,
    }

    let options = {};
    options = {
        url: `/expense/${expenses.idExpense}`,
        method: 'put',
        data: userExpense
    }

    axios(options)
        .then((response) => {
            dispatch({
                type: EDIT_EXPENSE_SUCCESS,
                payload: response.data
            });
        }).then(() => {
            dispatch(loadExpense(history, ''));
        })
        .catch((error) => {
            dispatch({
                type: EDIT_EXPENSE_FAIL,
                payload: error
            });
            console.log('error');
        });
}

export const addExpense = (history, expensesData) => dispatch => {
    dispatch({
        type: ADD_EXPENSE_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    let options = {};
    options = {
        url: '/expense',
        method: 'post',
        data: expensesData
    }

    axios(options)
        .then((response) => {
            dispatch({
                type: ADD_EXPENSE_SUCCESS,
            });
        }).then(() => {
            dispatch(loadExpense(history, ''));
        })
        .catch((error) => {
            dispatch({
                type: ADD_EXPENSE_FAIL,
                payload: error
            });
            console.log('error');
        });

}

