
const { db } = require("../util/admin");

exports.getAllCategoryExpenses = (request, response) => {
    db.collection("categoryExpenses")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
            let categoryExpenses = [];
            data.forEach((doc) => {
                categoryExpenses.push({
                    idCategoryExpense: doc.id,
                    description: doc.data().description,
                    date: doc.data().date,
                });
            });
            return response.json(categoryExpenses);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.addCategoryExpense = (request, response) => {
    if (request.body.description.trim() === '') {
        return response.status(400).json({ description: "Must not be empty" });
    }

    const newCategoryExpenseItem = {
        description: request.body.description,
        date: new Date().toISOString(),
    };

    db.collection("categoryExpenses")
        .add(newCategoryExpenseItem)
        .then((doc) => {
            const responseCategoryExpenseItem = newCategoryExpenseItem;
            responseCategoryExpenseItem.id = doc.id;

            return response.json(responseCategoryExpenseItem);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({ erro: "Something went wrong" });
        });
};

exports.deleteCategoryExpense = (request, response) => {
    const document = db.doc(`/categoryExpenses/${request.params.categoryExpenseId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Category Expense not found' });
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

exports.editCategoryExpense = (request, response) => {
    if (request.body.categoryExpenseId || request.body.date) {
        response.status(403).json({ message: 'Not allow to edit' })
    }
    let document = db.collection('categoryExpenses').doc(`${request.params.categoryExpenseId}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfull' });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: err.code });
        });
};
