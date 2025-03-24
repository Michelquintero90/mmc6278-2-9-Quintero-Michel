const connection = require('../config/connection');

const Habit = {
    getAllHabits: (callback) => {
        const query = 'SELECT * FROM habits';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error getting habits:', err);
                callback([]);
                return;
            }
            callback(results);
        });
    },

    addHabit: (name, description, frequency, callback) => {
        const query = 'INSERT INTO habits (name, description, frequency) VALUES (?, ?, ?)';
        connection.query(query, [name, description, frequency], (err, results) => {
            if (err) {
                console.error('Error adding habit:', err);
                callback(null);
                return;
            }
            callback(results.insertId);
        });
    },

    toggleComplete: (id, completed, callback) => {
        const query = 'UPDATE habits SET completed = ? WHERE id = ?';
        console.log('SQL:', query, [completed, id]); 
        connection.query(query, [completed, id], (err, results) => {
            if (err) {
                console.error('Error updating habit:', err);
                callback(false);
                return;
            }
            callback(true);
        });
    },

    deleteHabit: (id, callback) => {
        const query = 'DELETE FROM habits WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error in eliminating the habit:', err);
                callback(false);
                return;
            }
            callback(true);
        });
    },

};

module.exports = Habit;
