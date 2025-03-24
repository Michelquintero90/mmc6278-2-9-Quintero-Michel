INSERT INTO habits (name, description, frequency, completed) VALUES
('Drink water', 'Make sure to drink at least 2 liters of water daily', 'daily'),
('Exercise', 'Do at least 30 minutes of physical exercise', 'daily'),
('Meditate', 'Take 10 minutes to meditate and relax', 'daily'),
('Read a book', 'Read at least 20 pages of a book every day', 'daily'),
('Sleep early', 'Go to bed before 11:00 PM for good rest', 'daily'),
('Deep breathing', 'Practice deep breathing exercises every hour', 'daily');

INSERT INTO progress (habit_id, date, completed) VALUES
(1, '2025-03-20', TRUE),
(1, '2025-03-21', FALSE),
(1, '2025-03-22', TRUE),
(2, '2025-03-20', TRUE),
(2, '2025-03-21', TRUE),
(2, '2025-03-22', TRUE),
(3, '2025-03-20', TRUE),
(3, '2025-03-21', TRUE),
(3, '2025-03-22', FALSE),
(4, '2025-03-20', TRUE),
(4, '2025-03-21', TRUE),
(4, '2025-03-22', TRUE),
(5, '2025-03-20', FALSE),
(5, '2025-03-21', TRUE),
(5, '2025-03-22', TRUE),
(6, '2025-03-20', TRUE),
(6, '2025-03-21', FALSE),
(6, '2025-03-22', TRUE);
