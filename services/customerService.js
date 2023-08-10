const CustomerModel = require('../model/userModel');


class CustomerService{
    
    //Add a User
    async create(customerData){
        return await CustomerModel.create(customerData)
    }

    // Updata a User
    async update(id, customerupdate){
        return await CustomerModel.findByIdAndUpdate(id, customerupdate,{
             new: true,
        })
    }

    // delete a customer
    async delete(id){
        return await CustomerModel.findByIdAndDelete(id)
    }

    //get a single customer
    async fetchOne(filter){
        return await CustomerModel.findOne(filter)
    }

    // get all customer
    async fetch(filter){
        return await CustomerModel.find(filter)
    }
}

module.exports = new CustomerService()


