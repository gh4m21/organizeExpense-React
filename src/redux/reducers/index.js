import { combineReducers } from 'redux';
import expense from '../reducers/expense';
import income from '../reducers/income';
import categoryExpense from '../reducers/categoryExpense';
import categoryIncome from '../reducers/categoryIncome';
import currency from '../reducers/currency';
import user from '../reducers/user';

export default combineReducers({
    expense,
    income,
    categoryExpense,
    categoryIncome,
    currency,
    user,
});