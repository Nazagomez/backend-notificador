import { Sequelize } from 'sequelize';
import dotevn from 'dotenv';

dotevn.config({ path: '.env' });

/**
 * Represents the database connection.
 * @type {Sequelize}
 */
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	timezone: '-06:00',
	logging: false,
	define: {
		timestamps: true,
		paranoid: true,
		freezeTableName: true,
	},
	pool: {
		acquire: 30000,
		idle: 10000,
		max: 5,
		min: 0,
	},
});

export const dbConnect = async () => {
	try {
		//testing the connection to the database
		await db.authenticate();
		console.log('\x1b[36m%s\x1b[0m', 'Connection has been established successfully.');

		//synchronizing the models with the database
		try {
			await db.sync({ alter: true });
			console.log('\x1b[36m%s\x1b[0m', 'All models were synchronized successfully.');
		} catch (error) {
			console.error('\x1b[31m%s\x1b[0m', 'Unable to synchronize the models with the database:', error);
		}
	} catch (error) {
		console.error('\x1b[31m%s\x1b[0m', 'Unable to connect to the database:', error);
	}
};

export default db;
