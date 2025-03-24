const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/', habitController.home);

router.post('/habits', habitController.addHabit);

router.delete('/habits/:id', habitController.deleteHabit);

router.get('/habits', habitController.getAllHabits);

module.exports = router;
