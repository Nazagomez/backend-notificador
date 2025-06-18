import cron from 'node-cron';
import { Event } from '../models/index.js';
import { Op } from 'sequelize';

cron.schedule('* * * * *', async () => {
	console.log('⏰updating events');

	const now = new Date();

	try {
		await Event.update(
			{ state: 'ongoing' },
			{
				where: {
					state: 'upcoming',
					date: {
						[Op.lte]: now,
					},
				},
			},
		);

		await Event.update(
			{ state: 'completed', deletedAt: new Date() },
			{
				where: {
					state: {
						[Op.in]: ['ongoing', 'upcoming'],
					},
					date: {
						[Op.lt]: now,
					},
				},
			},
		);
	} catch (error) {
		console.error('❌ Error updating events:', error);
	}
});
