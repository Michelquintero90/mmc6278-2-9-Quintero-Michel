const path = require('path');
const Habit = require('../models/habit');
const Progress = require('../models/progress');
const { getMotivationalQuote } = require('../services/quoteService');

module.exports = {
    home: async (req, res) => {
        try {
            const quote = await getMotivationalQuote(); 
            Habit.getAllHabits((habits) => {
                res.render('home', { habits, quote }); 
            });
        } catch (error) {
            console.error('Controller error:', error);
            res.render('home', { habits: [], quote: 'Error getting the quote.' });
        }
    },
    addHabit: (req, res) => {
        const { name, description, frequency } = req.body;
        if (!name || !description || !frequency) {
            return res.status(400).send('The name, description and frequency of the habit are required.');
        }
        Habit.addHabit(name, description, frequency, (insertId) => {
            if (insertId) {
                res.status(201).json({ id: insertId, name, description, frequency, completed: false });
            } else {
                res.status(500).send('Error adding habit.');
            }
        });
    },

    toggleComplete: (req, res) => {
        const { id } = req.params;
        const { completed } = req.body;

        console.log('Value received for completed:', completed); 

        Habit.toggleComplete(id, completed, (success) => {
            if (success) {
                res.status(200).send('Updated habit.');
            } else {
                res.status(500).send('Error updating habit.');
            }
        });
    },

    deleteHabit: (req, res) => {
        const { id } = req.params;
        Habit.deleteHabit(id, (success) => {
            if (success) {
                res.status(200).send('Habit eliminated.');
            } else {
                res.status(500).send('Error in eliminating the habit.');
            }
        });
    },

    showProgress: (req, res) => {
        const habitId = parseInt(req.params.id);

        Habit.getAllHabits((habits) => {
            const habit = habits.find(h => h.id === habitId);

            if (habit) {
                Progress.getProgressByHabitId(habitId, (progress) => {
                    res.render('progress', { habit, progress });
                });
            } else {
                res.status(404).send("Habit not found");
            }
        });
    },

    getAllHabits: (req, res) => {
        Habit.getAllHabits((habits) => {
            res.json(habits); 
        });
    },
};
