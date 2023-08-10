const CustomerService = require("../services/customerService");

class CustomerController {
  async createCustomer(req, res) {
    const body = req.body;
    console.log(body);

    // Check if a customer is of that title already exist
    // If not create the customer
    const existingCustomer = await CustomerService.fetchOne({
      email: body.email.toLowerCase(),bvn: body.bvn,
    });
    if (existingCustomer)
      return res.status(403).json({
        success: false,
        message: "customer already exist",
      });

    const createdCustomer = await CustomerService.create(body);
    return res.status(201).json({
      success: true,
      message: "customer Created Successfully",
      data: createdCustomer,
    });
  }

  async updateCustomer(req, res) {
    const updateData = req.body;
    const customerId = req.params.Id;

    // fetch the customer wth the Id

    const existingCustomer = await CustomerService.fetchOne({ _id: customerId });
    if (!existingCustomer)
      res.status(403).json({
        success: false,
        message: "customer not found",
      });
    if (updateData.name) {
      const existingCustomerWithUpdateName = await CustomerService.fetchOne({
        name: updateData.name.toLowerCase(),
      });
      if (existingCustomerWithUpdateName._id.toString() !== customerId) {
        return res.status(403).json({
          success: false,
          message: "customer with that ttle already exist",
        });
      }
    }
    const updatedData = await CustomerService.update(customerId, updateData);
    res.status(200).json({
      success: true,
      message: "customer updated successfully",
      data: updatedData,
    });
  }
  async fetchCustomers(req, res) {
    const allCustomers = await CustomerService.fetch({});
    return res.status(200).json({
      success: true,
      message: "customer successfully fetched",
      data: allCustomers,
    });
  }
  async fetchOneCustomer(req, res) {
    const customerId = req.params.Id;
    const customerToFetch = await CustomerService.fetchOne({ _id: customerId });
    if (!customerToFetch)
      return res.status(403).json({
        success: false,
        message: "customer not Found",
      });

    res.status(200).json({
      success: true,
      message: "customer Fetched Successfully",
      data: customerToFetch,
    });
  }

  async deleteCustomer(req, res) {
    const customerId = req.params.id;
    const customerToFetch = await CustomerService.fetchOne({ _id: customerId });

    if (!customerToFetch)
      return res.status(404).json({
        success: false,
        message: "customer not found",
      });

    const deletedCustomer = await CustomerService.delete(customerId);
    return res.status(200).json({
      success: true,
      message: "customer Deleted Successfully",
      data: deletedCustomer,
    });
  }
}

module.exports = new CustomerController();
