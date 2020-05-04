const { db } = require("../util/admin");

exports.getAllExpenses = (request, response) => {
  db.collection('expenses')
    .where('username', '==', request.user.username)
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let expenses = [];
      data.forEach((doc) => {
        expenses.push({
          idExpense: doc.id,
          description: doc.data().description,
          category: doc.data().category,
          amount: doc.data().amount,
          currency: doc.data().currency,
          date: doc.data().date,
        });
      });
      return response.json(expenses);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getOneExpense = (request, response) => {
  db.doc(`/expenses/${request.params.expenseId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'Expense not found' });
      }

      if (doc.data().username !== request.user.username) {
        return response.status(403).json({ error: 'Unauthorized' });
      }

      expenseData = doc.data();
      expenseData.expenseId = doc.id;
      return response.json(expenseData);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: err.code });
    });
}

exports.addExpense = (request, response) => {
  if (request.body.description.trim() === '') {
    return response.status(400).json({ description: "Must not be empty" });
  }

  if (request.body.amount.trim() === '') {
    return response.status(400).json({ amount: "Must not be empty" });
  }

  const newExpenseItem = {
    username: request.user.username,
    description: request.body.description,
    category: request.body.category,
    amount: request.body.amount,
    currency: request.body.currency,
    date: new Date().toISOString(),
  };

  db.collection("expenses")
    .add(newExpenseItem)
    .then((doc) => {
      const responseExpenseItem = newExpenseItem;
      responseExpenseItem.id = doc.id;

      return response.json(responseExpenseItem);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ erro: "Something went wrong" });
    });
};

exports.deleteExpense = (request, response) => {
  const document = db.doc(`/expenses/${request.params.expenseId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'Expense not found' });
      }

      if (doc.data().username !== request.user.username) {
        return response.status(403).json({ error: 'Unauthorized' });
      }

      return document.delete();
    })
    .then(() => {
      response.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: err.code });
    });
};

exports.editExpense = (request, response) => {
  if (request.body.expenseId || request.body.date) {
    response.status(403).json({ message: 'Not allow to edit' })
  }
  let document = db.collection('expenses').doc(`${request.params.expenseId}`);
  document.update(request.body)
    .then(() => {
      response.json({ message: 'Updated successfull' });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: err.code });
    });
};
