const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();  

    res.redirect('/contact'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving the contact message');
  }
});

module.exports = router;
