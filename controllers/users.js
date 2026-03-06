const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').findOne({ _id: userId });
    if (!result) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

module.exports = {
    getAll,
    getSingle,
};