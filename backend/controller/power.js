const Power = require("../model/power.model");

const PowerControllers = {
  addPower: async (req, res) => {
    try {
      const {
        ps_id,
        ps_type,
        ps_location,
        ps_in_charge,
        ps_staff,
        ps_volt,
        ps_allo_area,
      } = req.body;

      const powerID = await Power.findOne({ ps_id });
      if (powerID) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${powerID.ps_id} id already registered.`,
        });
      }

      const newPower = new Power({
        ps_id,
        ps_type,
        ps_location,
        ps_in_charge,
        ps_staff,
        ps_volt,
        ps_allo_area,
      });

      await newPower.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        Data: newPower,
        message: "New Power Source added was successfully.",
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

  getAllPowers: async (req, res) => {
    try {
      const allPower = await Power.find();

      if (!allPower) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: allAreas,
          message: "Power list not found.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: allPower,
          message: "All Power list recieved.",
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

  getPowerById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const PowerDetails = await Power.findOne({ ps_id: req.params.id });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: PowerDetails,
          message: `${PowerDetails.ps_id}'s details recieved.`,
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

  updatePowerDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          ps_type,
          ps_location,
          ps_in_charge,
          ps_staff,
          ps_volt,
          ps_allo_area,
        } = req.body;

        const id = await Power.findOne({ ps_id: req.params.id });
        const ptype = await Power.findOne({ ps_type });
        const ploc = await Power.findOne({ ps_location });
        const in_charge = await Power.findOne({ ps_in_charge });
        const sta = await Power.findOne({ ps_staff });
        const pvolt = await Power.findOne({ ps_volt });
        const parea = await Power.findOne({ ps_allo_area });

        if (ptype && ploc && in_charge && sta && pvolt && parea) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This details already exists.`,
          });
        } else {
          await Power.findOneAndUpdate(
            { ps_id: req.params.id },
            {
              ps_type,
              ps_location,
              ps_in_charge,
              ps_staff,
              ps_volt,
              ps_allo_area,
            }
          );
          const updatePower = await Power.findOne({ ps_id: req.params.id });

          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            Data: updatePower,
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

  deletePower: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const updatePower = await Power.findOne({ ps_id: req.params.id });
        const power = await Power.findOneAndDelete({ ps_id: req.params.id });
        console.log("ps", req.params.id);
        console.log("psa", updatePower);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Data: power,
          message: power.ps_id + " is deleted successfully.",
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

module.exports = PowerControllers;
