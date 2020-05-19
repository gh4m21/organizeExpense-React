import {
    CATEGORY_INCOME_FETCH_REQUEST,
    CATEGORY_INCOME_FETCH_SUCCESS,
    CATEGORY_INCOME_FETCH_FAIL
} from './Constants';

import axios from 'axios';

export const loadCategoryIncome = () => dispatch => {
    dispatch({
        type: CATEGORY_INCOME_FETCH_REQUEST,
    });

    axios
        .get('/categoryIncome')
        .then((response) => {
            dispatch({
                type: CATEGORY_INCOME_FETCH_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: CATEGORY_INCOME_FETCH_FAIL,
            });
            console.log('error');
        });


}