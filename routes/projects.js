const express = require('express');
const router = express.Router(); 
const Project = require('../models/project'); 

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find(); 
    res.render('projects', { projects }); 
  } catch (error) {
    res.status(500).send('Error retrieving projects');
  }
});

module.exports = router; 