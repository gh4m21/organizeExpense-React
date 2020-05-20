

export const getTotalExpense = (expenseData) => {
    let total = 0;
    let i;
    for (i = 0; i < expenseData.length; i++) {
        total += parseInt(expenseData[i].amount);
    }

    return total;

}

export const getTotalIncome = (incomeData) => {
    let total = 0;
    let i;
    for (i = 0; i < incomeData.length; i++) {
        total += parseInt(incomeData[i].amount);
    }

    return total;
}

export const getTotalBill = (expenseData) => {
    let total = 0;
    let i;
    for (i = 0; i < expenseData.length; i++) {
        if (expenseData[i].category === 'bill') {
            total += parseInt(expenseData[i].amount);
        }
    }

    return total;
}

export const getEconomy = (totalExpense, totalIncome) => {
    return totalIncome - totalExpense;
}