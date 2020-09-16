const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
const cors = require('cors');

app.use(cors({ origin: true }));

const { getAllExpenses, getOneExpense, addExpense, deleteExpense, editExpense } = require('./API/expenses');
const { getAllIncomes, getOneIncome, addIncome, deleteIncome, editIncome } = require('./API/incomes');
const { getAllCategoryExpenses, addCategoryExpense, deleteCategoryExpense, editCategoryExpense } = require('./API/categoryExpenses');
const { getAllCategoryIncomes, addCategoryIncome, deleteCategoryIncome, editCategoryIncome } = require('./API/categoryIncomes');
const { getAllCurrency, addCurrency, deleteCurrency, editCurrency } = require('./API/currencies');
const { loginUser, signUpUser, uploadProfilePhoto, getUserDetail, updateUserDetails } = require('./API/users');

//Routes API
//Expenses
app.get('/expense', auth, getAllExpenses);
app.get('/expense/:expenseId', auth, getOneExpense);
app.post('/expense', auth, addExpense);
app.delete('/expense/:expenseId', auth, deleteExpense);
app.put('/expense/:expenseId', auth, editExpense);

//Incomes
app.get('/income', auth, getAllIncomes);
app.get('/income/:incomeId', auth, getOneIncome);
app.post('/income', auth, addIncome);
app.delete('/income/:incomeId', auth, deleteIncome);
app.put('/income/:incomeId', auth, editIncome);

//categoryExpenses
app.get('/categoryexpenses', getAllCategoryExpenses);
app.post('/categoryexpense', addCategoryExpense);
app.delete('/categoryexpense/:categoryExpenseId', deleteCategoryExpense);
app.put('/categoryexpense/:categoryExpenseId', editCategoryExpense);

//categoryIncomes
app.get('/categoryincome', getAllCategoryIncomes);
app.post('/categoryincome', addCategoryIncome);
app.delete('/categoryincome/:categoryIncomeId', deleteCategoryIncome);
app.put('/categoryincome/:categoryIncomeId', editCategoryIncome);

//Currency
app.get('/currency', getAllCurrency);
app.post('/currency', addCurrency);
app.delete('/currency/:currencyId', deleteCurrency);
app.put('/currency/:currencyId', editCurrency);

//Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);


exports.api = functions.https.onRequest(app);
