
const { db } = require("../util/admin");

exports.getAllCategoryIncomes = (request, response) => {
    db.collection("categoryIncomes")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
            let categoryIncomes = [];
            data.forEach((doc) => {
                categoryIncomes.push({
                    idCategoryIncome: doc.id,
                    description: doc.data().description,
                    date: doc.data().date,
                });
            });
            return response.json(categoryIncomes);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.addCategoryIncome = (request, response) => {
    if (request.body.description.trim() === '') {
        return response.status(400).json({ description: "Must not be empty" });
    }

    const newCategoryIncomeItem = {
        description: request.body.description,
        date: new Date().toISOString(),
    };

    db.collection("categoryIncomes")
        .add(newCategoryIncomeItem)
        .then((doc) => {
            const responseCategoryIncomeItem = newCategoryIncomeItem;
            responseCategoryIncomeItem.id = doc.id;

            return response.json(responseCategoryIncomeItem);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({ erro: "Something went wrong" });
        });
};

exports.deleteCategoryIncome = (request, response) => {
    const document = db.doc(`/categoryIncomes/${request.params.categoryIncomeId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Category Income not found' });
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

exports.editCategoryIncome = (request, response) => {
    if (request.body.categoryIncomeId || request.body.date) {
        response.status(403).json({ message: 'Not allow to edit' })
    }
    let document = db.collection('categoryIncomes').doc(`${request.params.categoryIncomeId}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfull' });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: err.code });
        });
};
