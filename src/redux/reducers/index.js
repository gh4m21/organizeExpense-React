import { combineReducers } from 'redux';
import expense from '../reducers/expense';
import categoryExpense from '../reducers/categoryExpense';
import currency from '../reducers/currency';

export default combineReducers({
    expense,
    categoryExpense,
    currency,
});