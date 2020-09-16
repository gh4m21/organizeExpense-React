import {
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
    API_BASE_URL
} from './Constants';
import axios from 'axios';
import { authMiddleWare } from '../../util/auth';
import { Route, Redirect } from 'react-router-dom';


export const getUser = (history) => dispatch => {

    dispatch({
        type: USER_FETCH_REQUEST,
    });

    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
        .get(API_BASE_URL + '/user')
        .then((response) => {

            dispatch({
                type: USER_FETCH_SUCCESS,
                payload: response.data.userCredentials
            });
        })
        .catch((error) => {
            if (error.response.status === 403) {
                history.push('/login');
            }

            dispatch({
                type: USER_FETCH_FAIL,
                payload: 'You are logout, please reconnect again'
            });

        });

}