import {
    CURRENCY_FETCH_REQUEST,
    CURRENCY_FETCH_SUCCESS,
    CURRENCY_FETCH_FAIL
} from '../actions/Constants';

import axios from 'axios';

export const loadCurrency = () => dispatch => {
    dispatch({
        type: CURRENCY_FETCH_REQUEST,
    });

    axios
        .get('/currency')
        .then((response) => {
            dispatch({
                type: CURRENCY_FETCH_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: CURRENCY_FETCH_FAIL,
            });
            console.log('error');
        });


}