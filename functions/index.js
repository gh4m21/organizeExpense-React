const functions = require('firebase-functions');
const app = require('express')();

const { getAllExpenses, addExpense, deleteExpense, editExpense } = require('./APIs/expenses');
const { getAllIncomes, addIncome, deleteIncome, editIncome } = require('./APIs/incomes');
const { getAllCategoryExpenses, addCategoryExpense, deleteCategoryExpense, editCategoryExpense } = require('./APIs/categoryExpenses');
const { getAllCategoryIncomes, addCategoryIncome, deleteCategoryIncome, editCategoryIncome } = require('./APIs/categoryIncomes');
const { getAllCurrency, addCurrency, deleteCurrency, editCurrency } = require('./APIs/currencies');

//Routes API
//Expenses
app.get('/getAllExpenses', getAllExpenses);
app.post('/addExpense', addExpense);
app.delete('/deleteExpense/:expenseId', deleteExpense);
app.put('/editExpense/:expenseId', editExpense);

//Incomes
app.get('/getAllIncomes', getAllIncomes);
app.post('/addIncome', addIncome);
app.delete('/deleteIncome/:incomeId', deleteIncome);
app.put('/editIncome/:incomeId', editIncome);

//categoryExpenses
app.get('/getAllCategoryExpenses', getAllCategoryExpenses);
app.post('/addCategoryExpense', addCategoryExpense);
app.delete('/deleteCategoryExpense/:categoryExpenseId', deleteCategoryExpense);
app.put('/editCategoryExpense/:categoryExpenseId', editCategoryExpense);

//categoryIncomes
app.get('/getAllCategoryIncomes', getAllCategoryIncomes);
app.post('/addCategoryIncome', addCategoryIncome);
app.delete('/deleteCategoryIncome/:categoryIncomeId', deleteCategoryIncome);
app.put('/editCategoryIncome/:categoryIncomeId', editCategoryIncome);

//Currency
app.get('/getAllCurrency', getAllCurrency);
app.post('/addCurrency', addCurrency);
app.delete('/deleteCurrency/:currencyId', deleteCurrency);
app.put('/editCurrency/:currencyId', editCurrency);

exports.api = functions.https.onRequest(app);
