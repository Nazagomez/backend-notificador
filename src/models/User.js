import db from '../config/db.js';
import { DataTypes } from 'sequelize';

const User = db.define('User', {
	id:{
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	},
	email:{
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},
	password:{
		type: DataTypes.STRING,
		allowNull: true,
	},
	role:{
		type: DataTypes.ENUM('admin', 'anonymous'),
		allowNull: false,
		defaultValue: 'anonymous'
	}
});

export default User;