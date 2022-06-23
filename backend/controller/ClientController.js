const Client = require("../models/Client");
const Project = require("../models/Project");

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
    return await Client.findById(req);
  } catch (error) {
    console.error(`getClientById error: ${error}`.red);
    res.stats(500).json({ message: "Server Error" });
  }
};

const addClient = async (req, res) => {
  try {
    const { name, email, phone } = req;
    const client = new Client({
      name,
      email,
      phone,
    });

    return await client.save();
  } catch (error) {
    console.error(`addClient error: ${error}`.red);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req });
    projects.forEach((project) => project.remove());

    return await Client.findByIdAndDelete(req);
  } catch (error) {
    console.error(`addClient error: ${error}`.red);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getClients,
  getClientById,
  addClient,
  deleteClient,
};
