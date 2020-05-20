import {
    INCOME_FETCH_REQUEST,
    INCOME_FETCH_SUCCESS,
    INCOME_FETCH_FAIL,
    EDIT_INCOME_REQUEST,
    EDIT_INCOME_FAIL,
    EDIT_INCOME_SUCCESS,
    ADD_INCOME_REQUEST,
    ADD_INCOME_FAIL,
    ADD_INCOME_SUCCESS,
} from './Constants';
import axios from 'axios';
import { authMiddleWare } from '../../util/auth';


export const loadIncome = (history, incomes) => dispatch => {

    dispatch({
        type: INCOME_FETCH_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    if (incomes === '') { //load all expense
        axios
            .get('/income')
            .then((response) => {
                dispatch({
                    type: INCOME_FETCH_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: INCOME_FETCH_FAIL,
                });
                if (error.response.status === 403) {
                    window.location.href = '/login';
                }
                console.log('error');
            });

    } else { //load one income
        axios
            .get(`/expense/${incomes.idIncome}`)
            .then((response) => {
                dispatch({
                    type: INCOME_FETCH_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: INCOME_FETCH_FAIL,
                    payload: error
                });

                if (error.response.status === 403) {
                    window.location.href = '/login';
                }
                console.log('error');
            });

    }

}

export const editIncome = (history, incomes) => dispatch => {
    dispatch({
        type: EDIT_INCOME_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    const userIncome = {
        description: incomes.description,
        category: incomes.category,
        amount: incomes.amount,
        currency: incomes.currency,
    }

    let options = {};
    options = {
        url: `/income/${incomes.idIncome}`,
        method: 'put',
        data: userIncome
    }

    axios(options)
        .then((response) => {
            dispatch({
                type: EDIT_INCOME_SUCCESS,
                payload: response.data
            });
        }).then(() => {
            dispatch(loadIncome(history, ''));
        })
        .catch((error) => {
            dispatch({
                type: EDIT_INCOME_FAIL,
                payload: error
            });
            console.log('error');
        });
}

export const addIncome = (history, incomesData) => dispatch => {
    dispatch({
        type: ADD_INCOME_REQUEST,
    });

    authMiddleWare(history)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    let options = {};
    options = {
        url: '/income',
        method: 'post',
        data: incomesData
    }

    axios(options)
        .then((response) => {
            dispatch({
                type: ADD_INCOME_SUCCESS,
            });
        }).then(() => {
            dispatch(loadIncome(history, ''));
        })
        .catch((error) => {
            dispatch({
                type: ADD_INCOME_FAIL,
                payload: error
            });
            console.log('error');
        });

}

