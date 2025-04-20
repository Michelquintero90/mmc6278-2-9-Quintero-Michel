import fetch from 'node-fetch';
import Event from '../models/Event.js';

export async function getAllEvents(req, res) {
  try {
    const events = await Event.find()
      .select('title description location date creator') 
      .populate('creator', 'username');

    const eventsWithCoordinates = await Promise.all(
      events.map(async (event) => {
        if (event.location) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(event.location)}`
          );
          const data = await response.json();
          if (data.length > 0) {
            event.coordinates = {
              lat: data[0].lat,
              lon: data[0].lon,
            };
          } else {
            event.coordinates = {
              lat: 40.7128,
              lon: -74.0060,
            };
          }
        }
        return event;
      })
    );

    res.render('events/index', { events: eventsWithCoordinates });
  } catch (err) {
    res.status(500).send('Error loading events');
  }
}

export async function getEventById(req, res, returnEvent = false) {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'username');
    if (!event) {
      if (returnEvent) return null;
      return res.status(404).send('Event not found');
    }
    if (returnEvent) return event;
    res.render('events/show', { event });
  } catch (err) {
    res.status(500).send('Error loading event');
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, location, date } = req.body;

    const newEvent = new Event({
      title,
      description,
      location,
      date,
      creator: req.session.userId,
    });

    await newEvent.save();
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error creating event');
  }
}

export async function updateEvent(req, res) {
  try {
    console.log('Updating event:', req.params.id);
    console.log('User ID from session:', req.session.userId);

    console.log('Session user ID:', req.session.userId);
    if (!req.session.userId) {
      console.error('User is not authenticated');
      return res.status(403).send('You are not authorized to update this event.');
    }

    const event = await Event.findById(req.params.id).populate('creator', 'username');
    console.log('Event found:', event);

    if (!event) {
      console.error('Event not found');
      return res.status(404).send('Event not found');
    }

    console.log('Event creator ID:', event.creator._id.toString());
    console.log('Session user ID:', req.session.userId);

    if (event.creator._id.toString() !== req.session.userId.toString()) {
      console.error('Unauthorized update attempt');
      return res.status(403).send('You are not authorized to update this event.');
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.location = req.body.location;
    event.date = req.body.date;

    await event.save();
    console.log('Event updated successfully');
    res.redirect('/events/my-events');
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).send('Error updating event.');
  }
}

export async function deleteEvent(req, res) {
  try {
    console.log('Event ID to delete:', req.params.id); 
    const event = await Event.findById(req.params.id);
    console.log('Event found:', event); 
    if (!event) {
      return res.status(404).send('Event not found');
    }
    await event.deleteOne(); 
    console.log('Event deleted successfully');
    res.redirect('/events');
  } catch (err) {
    console.error('Error deleting event:', err); 
    res.status(500).send('Error deleting event');
  }
}

export async function getMyEvents(req, res) {
  try {
    const events = await Event.find({ creator: req.session.userId })
      .select('title description location date')
      .populate('creator', 'username');
    console.log('Events found:', events); 
    res.render('events/my-events', { events: events || [] }); 
  } catch (err) {
    console.error('Error loading your events:', err);
    res.render('events/my-events', { events: null, error: 'Error loading your events. Please try again later.' });
  }
}

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};
