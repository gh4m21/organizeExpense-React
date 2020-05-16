import {
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
} from '../actions/Constants';

const initialState = {
    user: [],
    error: '',
    uiLoading: false,
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            };

        case USER_FETCH_SUCCESS:
            return {
                ...state,
                user: payload,
                uiLoading: false,
            };

        case USER_FETCH_FAIL:
            return {
                ...state,
                error: payload,
                uiLoading: false,
            }

        default:
            return state;
    }
}
