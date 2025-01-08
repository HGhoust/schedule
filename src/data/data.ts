import type { IHourLection, ISubject } from '@/types/date'
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
export const subjectsChgu: ISubject[] = [
	{
		name: 'Хирургия',
		teacher: 'Магомадов Э.Л.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 1,
				hours: [{ room: 'Б3-01', time: 4, group: '406' }],
			},
		],
	},
	{
		name: 'Терапия',
		teacher: 'Ахмадова Е.А.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 1,
				hours: [{ room: 'Б3-01', time: 4, group: '406' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 2,
				hours: [{ room: 'Б3-01', time: 4, group: '406' }],
			},
			{
				type: 'Курация',
				location: 'Медицинский корпус ЧГУ',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						dateStart: new Date('2024-11-27'),
						dateEnd: new Date('2025-01-13'),
					},
				],
			},
		],
	},
	{
		name: 'Неврология',
		teacher: 'Дудаева А.А-С.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 1,
				hours: [{ room: 'Б3-01', time: 2, group: '406' }],
			},
		],
	},
	{
		name: 'Топографическая анатомия',
		teacher: 'Межидов С-М.Н.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 2,
				hours: [{ room: 'Г0-01', time: 2, group: '406' }],
			},
		],
	},
	{
		name: 'Дермато-венерология',
		teacher: 'Адаев Х.М.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 2,
				hours: [{ room: 'Б3-01', time: 4, group: '406' }],
			},
			{
				type: 'Курация',
				location: 'Медицинский корпус ЧГУ',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						dateStart: new Date('2024-11-21'),
						dateEnd: new Date('2024-11-26'),
					},
				],
			},
		],
	},
	{
		name: 'Стоматология',
		teacher: 'Кариев У.С.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [4],
				week: 2,
				hours: [{ room: 'Б3-01', time: 2, group: '406' }],
			},
		],
	},
	{
		name: 'Гинекология',
		teacher: 'Габатаева Г.У.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [4],
				week: 2,
				hours: [{ room: 'Б3-01', time: 4, group: '406' }],
			},
		],
	},
	{
		name: 'Судебная медицина',
		teacher: 'Махаев М.Р.',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 1,
				hours: [{ room: 'Б3-01', time: 2, group: '406' }],
			},
			{
				type: 'Курация',
				location: 'Медицинский корпус ЧГУ',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						dateStart: new Date('2024-11-13'),
						dateEnd: new Date('2024-11-20'),
					},
				],
			},
		],
	}, // След. группа
	{
		name: 'Общая химия',
		teacher: 'Магомадова Мадина Хусейновна',
		schedules: [
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 2,
				hours: [{ room: 'Б3-01', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 2,
				hours: [{ room: 'Г3-01', time: 8, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 1,
				hours: [{ room: 'Г3-01', time: 8, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'История России',
		teacher: 'Товсултанов Рустам Алхазурович',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 2,
				hours: [{ room: 'В3-09', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 2,
				hours: [{ room: 'Б4-07', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 1,
				hours: [{ room: 'Б4-07', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 1,
				hours: [
					{ room: 'В3-09', time: 4, group: 'Ст-110' },
					{ room: 'В3-09', time: 6, group: 'Ст-110' },
				],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [4],
				week: 1,
				hours: [{ room: 'В3-09', time: 2, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Иностранный язык',
		teacher: 'Алдиева Марина Шахидовна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 2,
				hours: [{ room: 'В4-10', time: 6, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 1,
				hours: [{ room: 'В4-10', time: 8, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 1,
				hours: [{ room: 'В3-09', time: 8, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 1,
				hours: [{ room: 'В3-10', time: 8, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Анатомия',
		teacher: 'Умарова Мадина Джандаровна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 2,
				hours: [{ room: 'Г0-08', time: 8, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [4],
				week: 2,
				hours: [{ room: 'Г0-08', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 2,
				hours: [{ room: 'Г0-08', time: 6, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 2,
				hours: [{ room: 'Г0-01', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 1,
				hours: [{ room: 'Г0-08', time: 2, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Биология',
		teacher: 'Хасанова Разита Исхаковна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 2,
				hours: [{ room: 'А2-04 / А2-05', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 1,
				hours: [{ room: 'А2-04 / А2-05', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 1,
				hours: [{ room: 'Б4-07', time: 6, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Чеченский язык',
		teacher: 'Мамалова Хоузу Эдилсултановна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 2,
				hours: [{ room: 'Данные отсутствуют', time: 8, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 1,
				hours: [{ room: 'Данные отсутствуют', time: 8, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Основы Российской Государственности',
		teacher: 'Юсупова Хазан Мусиповна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 1,
				hours: [{ room: 'Б3-06 / Б3-05', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 1,
				hours: [{ room: 'Б4-07', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 2,
				hours: [{ room: 'В3-05', time: 2, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Физкультура',
		teacher: 'уточнить',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 1,
				hours: [{ room: 'Спортзал', time: 2, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 2,
				hours: [{ room: 'Спортзал', time: 2, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Латинский язык',
		teacher: 'Магомадова Рукият Вахитовна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [2],
				week: 1,
				hours: [{ room: 'Б3-06', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [3],
				week: 2,
				hours: [{ room: 'Б3-06', time: 4, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Медицинская информатика',
		teacher: 'Висаитова Бэлла Хадиевна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 1,
				hours: [{ room: 'Б2-04', time: 2, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Кураторский час',
		teacher: 'Куратор',
		schedules: [
			{
				type: 'Кураторский час',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 1,
				hours: [{ room: 'Б3-07', time: 4, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Экономика',
		teacher: 'Алматова Имани Лачиевна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 1,
				hours: [{ room: 'Данные отсутствуют', time: 6, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [0],
				week: 2,
				hours: [{ room: 'Б4-07', time: 8, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Обучение служением',
		teacher: 'Автуев Имран Сулумбекович',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [4],
				week: 1,
				hours: [{ room: 'Г4-02', time: 4, group: 'Ст-110' }],
			},
			{
				type: 'Лекция',
				location: 'Медицинский корпус ЧГУ',
				day: [1],
				week: 2,
				hours: [{ room: 'Г0-01', time: 6, group: 'Ст-110' }],
			},
		],
	},
	{
		name: 'Лекарственные растения',
		teacher: 'Джабраилова Лариса Хамзатовна',
		schedules: [
			{
				type: 'Пара',
				location: 'Медицинский корпус ЧГУ',
				day: [5],
				week: 2,
				hours: [{ room: 'Г3-01', time: 6, group: 'Ст-110' }],
			},
		],
	},
]
