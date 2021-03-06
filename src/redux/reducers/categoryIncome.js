import {
    CATEGORY_INCOME_FETCH_REQUEST,
    CATEGORY_INCOME_FETCH_SUCCESS,
    CATEGORY_INCOME_FETCH_FAIL
} from '../actions/Constants';

const initialState = {
    categoryIncome: [],
    uiLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CATEGORY_INCOME_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            }

        case CATEGORY_INCOME_FETCH_SUCCESS:
            return {
                ...state,
                categoryIncome: payload,
                uiLoading: false,
            }

        case CATEGORY_INCOME_FETCH_FAIL:
            return {
                ...state,
                uiLoading: false,
            }

        default:
            return state;
    }
}