const connection = require('../config/connection');

const Progress = {
  getProgressByHabitId: function(habitId, callback) {
    connection.query('SELECT * FROM progress WHERE habit_id = ?', [habitId], function(err, results) {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = Progress;
