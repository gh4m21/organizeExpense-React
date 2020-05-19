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

} from '../actions/Constants';

const initialState = {
    incomes: [],
    errors: [],
    uiLoading: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case INCOME_FETCH_REQUEST:
            return {
                ...state,
                uiLoading: true,
            };

        case INCOME_FETCH_SUCCESS:
            return {
                ...state,
                uiLoading: false,
                incomes: payload,
            };

        case INCOME_FETCH_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        case ADD_INCOME_REQUEST:
            return {
                ...state,
                uiLoading: true,
            };

        case ADD_INCOME_SUCCESS:
            return {
                ...state,
                uiLoading: false,
            };

        case ADD_INCOME_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        case EDIT_INCOME_REQUEST:
            return {
                ...state,
                uiLoading: true,
            }

        case EDIT_INCOME_SUCCESS:
            return {
                ...state,
                uiLoading: false,
            }

        case EDIT_INCOME_FAIL:
            return {
                ...state,
                uiLoading: false,
                errors: payload,
            }

        default:
            return state;
    }
}
