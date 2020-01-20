const Accounts = require('../data/dbConfig');

const validateID = (req,res, next) =>{
    if(req.params.id){
        Accounts('accounts').select('*')
        .where({id: req.params.id})
        .then(result =>{
            if(result.length > 0){
                next();
            }else{
                res.status(404).json({error: "Account with requested ID does not exist"});
            }
        }).catch(error =>{
            res.status(500).json({error: "Something went wrong while fetching account"});
        });
    }else{
        res.status(400).json({error: "Missing ID parameter"});
    }
};

module.exports = validateID;