import type { IHourLection } from '@/types/date'
export const hours: IHourLection[] = [
	{
		hour: 2,
		timeStart: new Date().setHours(9, 0, 0),
		timeEnd: new Date().setHours(10, 30, 0),
	},
	{
		hour: 4,
		timeStart: new Date().setHours(10, 40, 0),
		timeEnd: new Date().setHours(12, 10, 0),
	},
	{
		hour: 6,
		timeStart: new Date().setHours(13, 0, 0),
		timeEnd: new Date().setHours(14, 30, 0),
	},
	{
		hour: 8,
		timeStart: new Date().setHours(14, 40, 0),
		timeEnd: new Date().setHours(16, 10, 0),
	},
	{
		hour: 10,
		timeStart: new Date().setHours(16, 20, 0),
		timeEnd: new Date().setHours(17, 50, 0),
	},
]
