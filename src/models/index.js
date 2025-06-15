import Event from './Event.js';
import User from './User.js';
import Notification from './Notification.js';

//admin creates events
User.hasMany(Event, { foreignKey: { allowNull: false } });
Event.belongsTo(User, { foreignKey: { allowNull: false } });

//user follows events
User.belongsToMany(Event, { through: 'event_follower', as: 'followedEvents' });
Event.belongsToMany(User, { through: 'event_follower', as: 'followers' });

//admin creates notifications
User.hasMany(Notification, { foreignKey: { allowNull: false } });
Notification.belongsTo(User, { foreignKey: { allowNull: false } });

//event has notifications
Event.hasMany(Notification, { foreignKey: { allowNull: false } });
Notification.belongsTo(Event, { foreignKey: { allowNull: false } });

export { Event, User, Notification };
