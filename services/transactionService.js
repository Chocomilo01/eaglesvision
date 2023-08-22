const TransactionModel = require('../model/transactionModel');



class TransactionService{

    //Add a User
    async create(transactionData){
        return await TransactionModel.create(transactionData)
    }

    // Updata a User
    async update(id, transactionupdate){
        return await TransactionModel.findByIdAndUpdate(id, transactionupdate,{
             new: true,
        })
    }

    // delete a customer
    async delete(id){
        return await TransactionModel.findByIdAndDelete(id)
    }

    //get a single customer
    async fetchOne(filter){
        return await TransactionModel.findOne(filter)
    }

    // get all customer
    async fetch(filter){
        return await TransactionModel.find(filter)
    }
}



module.exports = new TransactionService()

