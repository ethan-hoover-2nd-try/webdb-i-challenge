const express = require('express');
const AccountsDB = require('../data/dbConfig');
const router = express.Router();

const validateID = require('../middleware/validateID');

router.get('/', (req,res) =>{
    const query = req.query;
    AccountsDB.select('*')
    .from('accounts')
    .orderBy(query.sortby || 'id', query.sortdir || 'asc')
    .limit(query.limit)
    .then(accounts =>{
        res.status(200).json(accounts);
    }).catch(error =>{
        res.status(500).json({error: "There was an error fetching data from the DB."});
    });
});

router.get('/:id', validateID, (req,res) =>{
    AccountsDB('accounts').select('*')
    .where({id: req.params.id})
    .first()
    .then(account =>{
        res.status(200).json(account);
    }).catch(error =>{
        res.status(500).json({error: "Error retrieving specified account"});
    });
});

router.post('/', (req,res) =>{
    const newAccount = req.body;

    if(newAccount.name && newAccount.budget){
        AccountsDB('accounts').insert(newAccount, 'id')
        .then(id =>{
            res.status(201).json(id);
        }).catch(error =>{
            res.status(500).json({error: "Something went wrong while attempting to add account to database"});
        });
    }else{
        res.status(400).json({error: "Please include name and budget fields"});
    }
});

router.put('/:id', validateID, (req,res) =>{
    const accountUpdate = req.body;

    if(accountUpdate.name || accountUpdate.budget){
        AccountsDB('accounts')
        .where({id: req.params.id})
        .update(accountUpdate)
        .then(count => {
            res.status(200).json({message: count});
        }).catch(error =>{
            res.status(500).json({error: "Something went wrong while attempting to update info"});
        })
    }else{
        res.status(400).json({error: "You must provide name and or budget fields"});
    }
});

router.delete('/:id', validateID, (req,res) =>{
    AccountsDB('accounts')
    .where({id: req.params.id})
    .delete()
    .then(count =>{
        res.status(200).json({message: "Successfully removed account from database"});
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while attempting to remove account from the database"});
    });
});

module.exports = router;