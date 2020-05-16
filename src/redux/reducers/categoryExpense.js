import {
    CATEGORY_EXPENSE_FETCH_REQUEST,
    CATEGORY_EXPENSE_FETCH_SUCCESS,
    CATEGORY_EXPENSE_FETCH_FAIL
} from '../actions/Constants';

const initialState = {
    categoryExpense: [],
    uiLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CATEGORY_EXPENSE_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            }

        case CATEGORY_EXPENSE_FETCH_SUCCESS:
            return {
                ...state,
                categoryExpense: payload,
                uiLoading: false,
            }

        case CATEGORY_EXPENSE_FETCH_FAIL:
            return {
                ...state,
                uiLoading: false,
            }

        default:
            return state;
    }
}