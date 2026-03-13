const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const db = mongodb.getDb();
    console.log('Database connection: ', db.databaseName); // Debugging line to check database connection
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').findOne({ _id: userId });
    if (!result) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    // Implementation for creating a user
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        birthday: req.body.birthday,
        favoritecolor: req.body.favoriteColor,
        fname: req.body.fname,
        lname: req.body.lname
    }
    const response = await mongodb.getDb().collection('users').insertOne(newUser);
    if (response.acknowledged && response.insertedId) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    // Implementation for updating a user
    const userId = new ObjectId(req.params.id);
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        birthday: req.body.birthday,
        favoritecolor: req.body.favoriteColor,
        fname: req.body.fname,
        lname: req.body.lname
    }
    const response = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, newUser);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    // Implementation for deleting a user
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};