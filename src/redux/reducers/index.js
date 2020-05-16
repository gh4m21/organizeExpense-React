import { combineReducers } from 'redux';
import expense from '../reducers/expense';
import categoryExpense from '../reducers/categoryExpense';
import currency from '../reducers/currency';
import user from '../reducers/user';

export default combineReducers({
    expense,
    categoryExpense,
    currency,
    user,
});