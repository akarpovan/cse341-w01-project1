const mongodb = require('../data/database'); //connection
const Objectid = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);

    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new Objectid(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
        result.toArray().then((contacts) => {
            if (!contacts[0]) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);

        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid contact id format' });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged > 0) {
        //res.status(204).send();
        res.status(201).json({ id: response.insertedId });
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while inserting the contact.');
    };
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new Objectid(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updateing the contact.');
    };

};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new Objectid(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updateing the contact.');
    };
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};