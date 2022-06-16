const Client = require("../models/Client");

const getClients = async (req, res) => {
  try {
    return await Client.find();
  } catch (error) {
    console.error(`getClients error: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const getClientById = async (req, res) => {
  try {
    return await Client.find(req.params);
  } catch (error) {
    console.error(`getClientById error: ${error}`.red);
    res.stats(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getClients,
  getClientById,
};
