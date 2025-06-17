import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Event = db.define('Event', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	organizer: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	category: {
		type: DataTypes.ENUM(
			'sports',
			'music',
			'art',
			'technology',
			'education',
			'politics',
			'health',
			'games',
			'culture',
			'other',
		),
		allowNull: false,
	},
	state: {
		type: DataTypes.ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed'),
		allowNull: false,
		defaultValue: 'upcoming',
	},
	featured: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	capacity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
		},
	},
});

export default Event;
