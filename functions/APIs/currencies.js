
const { db } = require("../util/admin");

exports.getAllCurrency = (request, response) => {
    db.collection("currencies")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
            let currencies = [];
            data.forEach((doc) => {
                currencies.push({
                    idCurrency: doc.id,
                    description: doc.data().description,
                    date: doc.data().date,
                });
            });
            return response.json(currencies);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.addCurrency = (request, response) => {
    if (request.body.description.trim() === '') {
        return response.status(400).json({ description: "Must not be empty" });
    }

    const newCurrencyItem = {
        description: request.body.description,
        date: new Date().toISOString(),
    };

    db.collection("currencies")
        .add(newCurrencyItem)
        .then((doc) => {
            const responseCurrencyItem = newCurrencyItem;
            responseCurrencyItem.id = doc.id;

            return response.json(responseCurrencyItem);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({ erro: "Something went wrong" });
        });
};

exports.deleteCurrency = (request, response) => {
    const document = db.doc(`/currencies/${request.params.currencyId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Currency not found' });
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

exports.editCurrency = (request, response) => {
    if (request.body.currencyId || request.body.date) {
        response.status(403).json({ message: 'Not allow to edit' })
    }
    let document = db.collection('currencies').doc(`${request.params.currencyId}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfull' });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: err.code });
        });
};
