const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find(); 
    res.json(projects); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving projects' });
  }
});

router.post('/api/projects', async (req, res) => {
  try {
    const { title, description, image_url, project_url } = req.body;
    const newProject = new Project({ title, description, image_url, project_url });
    await newProject.save(); 
    res.status(201).json(newProject); 
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

router.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject); 
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

router.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id); 
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

module.exports = router; 