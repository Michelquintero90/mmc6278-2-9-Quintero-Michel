import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import controllers from '../controllers/index.js';

router.post('/login', controllers.auth.login);
router.get('/logout', controllers.auth.logout);
router.post('/signup', controllers.user.create);

router.get('/autocomplete', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Error fetching suggestions' });
  }
});

export default router;
