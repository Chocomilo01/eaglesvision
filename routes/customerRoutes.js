const express = require("express");
const router = express.Router();

const {
  authenticate,
  adminAuthorizer,
  admin_managerAuthorizer,
} = require("../middlewares/authentication");

const customerController = require("../controller/customerController");
const validate = require("../middlewares/validate.middleware");
const customerSchema = require("../schema/customer.schema");

/**
 * Create Customer
 * Roles: superAdmin, manager
 */
router.post(
  "/",
  authenticate,
  admin_managerAuthorizer,
  validate(customerSchema),
  customerController.createCustomer,
);

/**
 * Fetch All Customers
 */
router.get("/", authenticate, customerController.fetchCustomers);

/**
 * Search Customers
 */
router.get("/search", authenticate, customerController.searchCustomers);

/**
 * Fetch One Customer
 */
router.get("/:id", authenticate, customerController.fetchOneCustomer);

/**
 * Update Customer
 * Roles: superAdmin, manager
 */
router.patch(
  "/:id",
  authenticate,
  admin_managerAuthorizer,
  customerController.updateCustomer,
);

/**
 * Delete Customer
 * Role: superAdmin only
 */
router.delete(
  "/:id",
  authenticate,
  adminAuthorizer,
  customerController.deleteCustomer,
);

/**
 * Customer Transactions
 */
router.get(
  "/:customerId/transactions",
  authenticate,
  customerController.getCustomerTransactions,
);

module.exports = router;
