import {
    CURRENCY_FETCH_REQUEST,
    CURRENCY_FETCH_SUCCESS,
    CURRENCY_FETCH_FAIL
} from '../actions/Constants';

const initialState = {
    currencies: [],
    uiLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CURRENCY_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            }

        case CURRENCY_FETCH_SUCCESS:
            return {
                ...state,
                currencies: payload,
                uiLoading: false,
            }

        case CURRENCY_FETCH_FAIL:
            return {
                ...state,
                uiLoading: false,
            }

        default:
            return state;
    }
}