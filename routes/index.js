const express = require('express');
const router = express.Router();
const Project = require('../models/project'); 

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find(); 
    res.render('index', { projects }); 
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send('Error loading the page');
  }
});

module.exports = router;
