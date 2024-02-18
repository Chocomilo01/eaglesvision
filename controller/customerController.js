const CustomerService = require("../services/customerService");
const  { generateUniqueAccountNumber } = require("../utils/uniqueNumber")
const CustomerModel = require("../model/customerModel");
const customerService = require("../services/customerService");
const { data } = require("./customers");


class CustomerController {
    async createCustomer(req, res) {
      // const body = req.body;
      
      try {
        const customers = data
        const reg_customers = []
        for (const customer of customers) {
          // Generate a unique account number
          // const accountNumber = generateUniqueAccountNumber();
          // console.log('Generated Account Number:', accountNumber);
    
          // Check if a customer with that account number already exists
          // const existingCustomer = await CustomerService.fetchOne({ accountNumber });
    
          // this setting is wrong if an acc number is already selected \
          //    another one should be generated on auto
          // if (existingCustomer) {
          //   return res.status(403).json({
          //     success: false,
          //     message: 'Customer with this account number already exists',
          //   });
          // }
    
          // Add the account number to the customer data
          // customer.accountNumber = accountNumber;
          // console.log(customer)
          
          // Create a new customer document using the Mongoose service
          const createdCustomer = await customerService.create({...customer})

          reg_customers.push(createdCustomer)
        }
        
        console.log(createdCustomer)
        return res.status(201).json({
          success: true,
          message: 'Customer Created Successfully',
          data: reg_customers,
          // accountNumber,
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
        // console.log('I am now done with authentication')
        const allCustomers = await  CustomerService.fetch({});
        console.log(allCustomers)
        return res.status(200).json({
            success: true,
            message: 'Customer Fetched Successfully',
            data: allCustomers
        })
    }

    async fetchOneCustomer(req, res){
        const customerId = req.params.id;
        const customerToFetch = await CustomerService.fetchOne({_id: customerId});

        // if(!customerToFetch) res.status(403).json({
        //   success: false,
        //   message: 'customer not found'
        // })
        if(!customerToFetch) {
          return res.status(404).json({
            success: false,
            message: 'customer not found'
          })
        }

        return res.status(200).json({
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
            // data: deletedCustomer
        })

    }

    async getCustomerTransactions(req, res, next) {
      try {
        const customerId = req.params.customerId;
        const transactions = await customerService.getCustomerTransactions(customerId);
        res.status(200).json(transactions);
      } catch (error) {
        next(error);
      }
    }
    //Search Engine
    async searchCustomerByName(req, res) {
      try {
        const { name } = req.query;
    
        // Check if a name parameter is provided
        if (!name) {
          return res.status(400).json({
            success: false,
            message: 'Please provide a name for the search.',
          });
        }
    
        // Use the CustomerService to search customers by name (using the correct field)
        const customers = await CustomerService.fetch({ name: { $regex: name, $options: 'i' } });
    
        return res.status(200).json({
          success: true,
          message: 'Customers found successfully',
          data: customers,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error searching for customers by name',
          error: error.message,
        });
      }
    }

    async getSavingsTransactions(customerId) {
      try {
        // Filter transactions based on customer ID and type "savings"
        const savingsTransactions = await TransactionModel.find({
          customer: customerId,
          type: "savings",
        });
  
        return savingsTransactions;
      } catch (error) {
        throw error;
      }
    }
   
    // Currently Doesn't work
    async searchCustomers(req, res) {
      try {
        const { name, accountNumber, phoneNumber, dateOfBirth } = req.query;

        // Construct a query object based on the provided parameters
        const query = {};

        if (name) {
          query.firstName = new RegExp(name, 'i'); // Case-insensitive search
        }

        if (accountNumber) {
          query.lastName = new RegExp(accountNumber, 'i');
        }

        if (dateOfBirth) {
          query.email = new RegExp(dateOfBirth, 'i');
        }

        if (phoneNumber) {
          query.phoneNumber = new RegExp(phoneNumber, 'i');
        }

        // Call your CustomerService to search for customers using the query
        const customers = await CustomerService.searchCustomers(query);

        return res.status(200).json({
          success: true,
          message: 'Customers found successfully',
          data: customers
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error retrieving customers',
          error: error.message,
        });
      }
    } 

    // async getSavingsTransactions(req, res, next) {
    //   try {
    //     const customerId = req.params.customerId;
    //     const savingsTransactions = await CustomerService.getSavingsTransactions(customerId);
    //     res.status(200).json(savingsTransactions);
    //   } catch (error) {
    //     next(error);
    //   }
    // }
  
}

module.exports = new CustomerController()