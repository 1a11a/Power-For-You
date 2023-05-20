const Customer = require("../model/customer.model");

const CustomerControllers = {
  addCustomer: async (req, res) => {
    try {
      const {
        c_id,
        c_full_name,
        c_address,
        c_email,
        c_residenship,
        c_area_id,
        c_contact,
      } = req.body;

      const customerID = await Customer.findOne({ c_id });
      if (customerID) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${customerID.c_id} id already registered.`,
        });
      }

      const newCustomer = new Customer({
        c_id,
        c_full_name,
        c_address,
        c_email,
        c_residenship,
        c_area_id,
        c_contact,
      });

      await newCustomer.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        Data: newCustomer,
        message: "New Customer added was successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllCustomers: async (req, res) => {
    try {
      const allCustomers = await Customer.find();

      if (!allCustomers) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: allCustomers,
          message: "Customer list not found.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: allCustomers,
          message: "All Customer list recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const CustomerDetails = await Customer.findOne({ c_id: req.params.id });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: CustomerDetails,
          message: `${CustomerDetails.c_id}'s details recieved.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateCustomerDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
            c_full_name,
            c_address,
            c_email,
            c_residenship,
            c_area_id,
            c_contact,
        } = req.body;

        const id = await Customer.findOne({ c_id: req.params.id });
        const fn = await Customer.findOne({ c_full_name });
        const ad = await Customer.findOne({ c_address });
        const em = await Customer.findOne({ c_email });
        const ge = await Customer.findOne({ c_residenship });
        const ar = await Customer.findOne({ c_area_id });
        const co = await Customer.findOne({ c_contact });

        if (fn && ad && ro && em && ge && ar && co) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This details already exists.`,
          });
        } else {
          await Customer.findOneAndUpdate(
            { c_id: req.params.id },
            {
                c_full_name,
                c_address,
                c_email,
                c_residenship,
                c_area_id,
                c_contact,
            }
          );
          const updateCustomer = await Customer.findOne({ c_id: req.params.id });

          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            Data: updateCustomer,
            message: req.params.id + " is updated successfully.",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const customer = await Customer.findOneAndDelete({ c_id: req.params.id });
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: customer,
          message: customer.c_id + " is deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};

module.exports = CustomerControllers;
