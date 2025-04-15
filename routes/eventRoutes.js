import express from 'express';
const router = express.Router();
import eventController from '../controllers/event.js';
import { ensureAuthenticated } from '../middleware/auth.js';

router.get('/', ensureAuthenticated, eventController.getAllEvents);
router.get('/new', ensureAuthenticated, (req, res) => res.render('events/new'));
router.post('/', ensureAuthenticated, eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const event = await eventController.getEventById(req, res, true);
    if (event) {
      res.render('events/edit', { event });
    }
  } catch (err) {
    res.status(500).send('Error loading the edit form');
  }
});
router.put('/:id', ensureAuthenticated, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;