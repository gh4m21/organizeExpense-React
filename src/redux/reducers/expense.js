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

const initialState = {
    expenses: [],
    errors: [],
    uiLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case EXPENSE_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            };

        case EXPENSE_FETCH_SUCCESS:
            return {
                ...state,
                uiLoading: false,
                expenses: payload,
            };

        case EXPENSE_FETCH_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        case ADD_EXPENSE_REQUEST:
            return {
                ...state,
                uiLoading: true,
            };

        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                uiLoading: false,
            };

        case ADD_EXPENSE_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        case EDIT_EXPENSE_REQUEST:
            return {
                ...state,
                uiLoading: true,
            }

        case EDIT_EXPENSE_SUCCESS:
            return {
                ...state,
                uiLoading: false,
            }

        case EDIT_EXPENSE_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        default:
            return state;
    }
}
