const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: String,
  project_url: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
