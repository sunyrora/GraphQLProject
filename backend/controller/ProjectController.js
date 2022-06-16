const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    return await Project.find();
  } catch (error) {
    console.error("getProjects err: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    return await Project.find(req.params);
  } catch (error) {
    console.error(`getProjectById err: ${error}`);
    res.status(500).json({ message: "server Error" });
  }
};

module.exports = {
  getProjects,
  getProjectById,
};
