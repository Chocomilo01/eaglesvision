const CustomerService = require("../services/customerService");
const  { generateUniqueAccountNumber } = require("../utils/uniqueNumber")
const CustomerModel = require("../model/customerModel")


class CustomerController {
    async createCustomer(req, res) {
      const body = req.body;
      
      try {
        // Generate a unique account number
        const accountNumber = generateUniqueAccountNumber();
        console.log('Generated Account Number:', accountNumber);
  
        // Check if a customer with that account number already exists
        const existingCustomer = await CustomerService.fetchOne({ accountNumber });
  
        if (existingCustomer) {
          return res.status(403).json({
            success: false,
            message: 'Customer with this account number already exists',
          });
        }
  
        // Add the account number to the customer data
        body.accountNumber = accountNumber;
  
        // Create a new customer document using the Mongoose model
        const newCustomer = new CustomerModel(body);
  
        // Save the customer document to the database
        const createdCustomer = await newCustomer.save();
  
        return res.status(201).json({
          success: true,
          message: 'Customer Created Successfully',
          data: createdCustomer,
          accountNumber,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error creating customer',
          error: error.message,
        });
      }
    }

    async updateCustomer(req, res){
        const updateData = req.body
        const customerId = req.params.id
    
            // Fetch the user with the id
        const existingCustomer = await CustomerService.fetchOne({_id: customerId})
         if(!existingCustomer) res.status(403).json({
          success: false,
                message: 'Customer not found'
     })
        if(updateData.name){
            const existingCustomerWithUpdateName = await CustomerService.fetchOne({
            name: updateData.name.toLowerCase()
        })
        if(existingCustomerWithUpdateName._id.toString() !== customertId){
            return res.status(403).json({
         success: false,
         message: 'Customer with that title already exist'
                 });
             }
        }
        const updatedData = await CustomerService.update(customerId, updateData)
        res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            data: updatedData
        })

     }

    async fetchCustomers(req, res){
        console.log('I am now done with authentication')
        const allCustomers = await  CustomerService.fetch({});

        return res.status(200).json({
            success: true,
            message: 'Customer Fetched Successfully',
            data: allCustomers
        })

    }

    async fetchOneCustomer(req, res){
        const customerId = req.params.id;
        const customerToFetch = await CustomerService.fetchOne({_id: customerId});

        if(!customerToFetch) res.status(403).json({
            success: false,
            message: 'customer not found'
        })

         res.status(200).json({
            success: true,
            message: 'customer Fetched Successfully',
            data: customerToFetch
        })

    }
    

    async deleteCustomer(req, res){
        const customerId = req.params.id
        const customerToFetch = await  CustomerService.fetchOne({_id: customerId});

        if(!customerToFetch) return res.status(404).json({
            success: false,
            message: 'Customer not found'
        })

        const deletedCustomer = await CustomerService.delete(customerId);

        return res.status(200).json({
            success: true,
            message: 'Customer Deleted Successfully',
            data: deletedCustomer
        })

    }
      
}

module.exports = new CustomerController()