import { Event } from '../models/index.js';

const eventService = {
  create: async (eventData) => {
	try {
	  const event = await Event.create(eventData);
	  return event;
	} catch (error) {
	  throw new Error('Error creating event: ' + error.message);
	}
  },

  getAll: async () => {
	try {
	  const events = await Event.findAll();
	  return events;
	} catch (error) {
	  throw new Error('Error fetching events: ' + error.message);
	}
  },

  getById: async (id) => {
	try {
	  const event = await Event.findByPk(id);
	  if (!event) {
		throw new Error('Event not found');
	  }
	  return event;
	} catch (error) {
	  throw new Error('Error fetching event: ' + error.message);
	}
  },

  update: async (id, eventData) => {
	try {
	  const event = await Event.findByPk(id);
	  if (!event) {
		throw new Error('Event not found');
	  }
	  await event.update(eventData);
	  return event;
	} catch (error) {
	  throw new Error('Error updating event: ' + error.message);
	}
  },

  delete: async (id) => {
	try {
	  const event = await Event.findByPk(id);
	  if (!event) {
		throw new Error('Event not found');
	  }
	  await event.destroy();
	  return { message: 'Event deleted successfully' };
	} catch (error) {
	  throw new Error('Error deleting event: ' + error.message);
	}
  },
};

export default eventService;