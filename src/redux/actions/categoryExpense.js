import {
    CATEGORY_EXPENSE_FETCH_REQUEST,
    CATEGORY_EXPENSE_FETCH_SUCCESS,
    CATEGORY_EXPENSE_FETCH_FAIL,
    API_BASE_URL
} from '../actions/Constants';

import axios from 'axios';

export const loadCategoryExpense = () => dispatch => {
    dispatch({
        type: CATEGORY_EXPENSE_FETCH_REQUEST,
    });

    axios
        .get(API_BASE_URL + '/categoryExpenses')
        .then((response) => {
            dispatch({
                type: CATEGORY_EXPENSE_FETCH_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: CATEGORY_EXPENSE_FETCH_FAIL,
            });
            console.log('error');
        });


}