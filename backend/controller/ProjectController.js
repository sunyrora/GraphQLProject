const Project = require("../models/Project");
const Client = require("../models/Client");

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
    return await Project.findById(req);
  } catch (error) {
    console.error(`getProjectById err: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const addProject = async (req, res) => {
  try {
    const { clientId, name, description, status } = req;
    const project = new Project({
      clientId,
      name,
      description,
      status,
    });
    return await project.save();
  } catch (error) {
    console.error(`addProject error: ${error})}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    return await Project.findByIdAndDelete(req);
  } catch (error) {
    console.error(`deleteProject error: ${error})}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id, name, description, status, clientId } = req;
    return await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          clientId,
          description,
          status,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error(`updateProject error: ${error})}`);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
};
