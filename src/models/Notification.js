import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Notification = db.define('Notification', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: false
	},
});

export default Notification;