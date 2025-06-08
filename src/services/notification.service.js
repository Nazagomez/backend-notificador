import { Notification } from '../models/index.js';

const notificationService = {
	  create: async (notificationData) => {
	try {
	  const notification = await Notification.create(notificationData);
	  return notification;
	} catch (error) {
	  throw new Error('Error creating notification: ' + error.message);
	}
  },

  getAll: async () => {
	try {
	  const notifications = await Notification.findAll();
	  return notifications;
	} catch (error) {
	  throw new Error('Error fetching notifications: ' + error.message);
	}
  },

  getById: async (id) => {
	try {
	  const notification = await Notification.findByPk(id);
	  if (!notification) {
		throw new Error('Notification not found');
	  }
	  return notification;
	} catch (error) {
	  throw new Error('Error fetching notification: ' + error.message);
	}
  },

  update: async (id, notificationData) => {
	try {
	  const notification = await Notification.findByPk(id);
	  if (!notification) {
		throw new Error('Notification not found');
	  }
	  await notification.update(notificationData);
	  return notification;
	} catch (error) {
	  throw new Error('Error updating notification: ' + error.message);
	}
  },

  delete: async (id) => {
	try {
	  const notification = await Notification.findByPk(id);
	  if (!notification) {
		throw new Error('Notification not found');
	  }
	  await notification.destroy();
	  return { message: 'Notification deleted successfully' };
	} catch (error) {
	  throw new Error('Error deleting notification: ' + error.message);
	}
  },
}

export default notificationService;