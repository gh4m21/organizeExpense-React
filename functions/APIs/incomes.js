
const { db } = require("../util/admin");

exports.getAllIncomes = (request, response) => {
    db.collection("incomes")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
            let incomes = [];
            data.forEach((doc) => {
                incomes.push({
                    idIncome: doc.id,
                    description: doc.data().description,
                    category: doc.data().category,
                    amount: doc.data().amount,
                    currency: doc.data().currency,
                    date: doc.data().date,
                });
            });
            return response.json(incomes);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.addIncome = (request, response) => {
    if (request.body.description.trim() === '') {
        return response.status(400).json({ description: "Must not be empty" });
    }

    if (request.body.amount.trim() === '') {
        return response.status(400).json({ amount: "Must not be empty" });
    }

    const newIncomeItem = {
        description: request.body.description,
        category: request.body.category,
        amount: request.body.amount,
        currency: request.body.currency,
        date: new Date().toISOString(),
    };

    db.collection("incomes")
        .add(newIncomeItem)
        .then((doc) => {
            const responseIncomeItem = newIncomeItem;
            responseIncomeItem.id = doc.id;

            return response.json(responseIncomeItem);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({ erro: "Something went wrong" });
        });
};

exports.deleteIncome = (request, response) => {
    const document = db.doc(`/incomes/${request.params.incomeId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Income not found' });
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

exports.editIncome = (request, response) => {
    if (request.body.incomeId || request.body.date) {
        response.status(403).json({ message: 'Not allow to edit' })
    }
    let document = db.collection('incomes').doc(`${request.params.incomeId}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfull' });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: err.code });
        });
};
