const UserModel = require('../model/userModel');


class UserService{
    
    //Add a User
    async create(userData){
        return await UserModel.create(userData)
    }

    // Updata a User
    async update(id, userupdate){
        return await UserModel.findByIdAndUpdate(id, userupdate,{
             new: true,
        })
    }

    // delete a user
    async delete(id){
        return await UserModel.findByIdAndDelete(id)
    }

    //get a single user
    async fetchOne(filter){
        return await UserModel.findOne(filter)
    }

    // get all users
    async fetch(filter){
        return await UserModel.find(filter)
    }
}

module.exports = new UserService()


