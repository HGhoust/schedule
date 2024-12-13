import type { IHourLection, TypeSubjects } from '@/types/date'

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

export const subjectsChgu: TypeSubjects = [
	{
		name: 'Хирургия',
		teacher: 'Магомадов Э.Л.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [0],
				week: 1,
				hours: [
					{
						room: 'Б3-01',
						time: 4,
						group: '406',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Терапия',
		teacher: 'Ахмадова Е.А.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [1],
				week: 1,
				hours: [
					{
						room: 'Б3-01',
						time: 4,
						group: '406',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [1],
				week: 2,
				hours: [
					{
						room: 'Б3-01',
						time: 4,
						group: '406',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Курация',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						timeStart: new Date().setHours(13, 0, 0),
						timeEnd: new Date().setHours(16, 0, 0),
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
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [2],
				week: 1,
				hours: [
					{
						room: 'Б3-01',
						time: 2,
						group: '406',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Топографическая анатомия',
		teacher: 'Межидов С-М.Н.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'Г0-01',
						time: 2,
						group: '406',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Дермато-венерология',
		teacher: 'Адаев Х.М.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [3],
				week: 2,
				hours: [
					{
						room: 'Б3-01',
						time: 4,
						group: '406',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Курация',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						timeStart: new Date().setHours(13, 0, 0),
						timeEnd: new Date().setHours(16, 0, 0),
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
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [4],
				week: 2,
				hours: [
					{
						room: 'Б3-01',
						time: 2,
						group: '406',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Гинекология',
		teacher: 'Габатаева Г.У.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [4],
				week: 2,
				hours: [
					{
						room: 'Б3-01',
						time: 4,
						group: '406',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Судебная медицина',
		teacher: 'Махаев М.Р.',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [5],
				week: 1,
				hours: [
					{
						room: 'Б3-01',
						time: 2,
						group: '406',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Курация',
				day: [0, 1, 2, 3, 4],
				week: '',
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: '406',
						timeStart: new Date().setHours(13, 0, 0),
						timeEnd: new Date().setHours(16, 0, 0),
						dateStart: new Date('2024-11-13'),
						dateEnd: new Date('2024-11-20'),
					},
				],
			},
		],
	},

	// След. группа

	{
		name: 'Общая химия',
		teacher: 'Магомадова Мадина Хусейновна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Лекция',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'Б3-01',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [2],
				week: 2,
				hours: [
					{
						room: 'Г3-01',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [2],
				week: 1,
				hours: [
					{
						room: 'Г3-01',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'История России',
		teacher: 'Товсултанов Рустам Алхазурович',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'В3-09',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [1],
				week: 2,
				hours: [
					{
						room: 'Б4-07',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [0],
				week: 1,
				hours: [
					{
						room: 'В3-09',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[1].timeStart,
						timeEnd: hours[1].timeEnd,
						dateEnd: '',
					},
					{
						room: 'В3-09',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[2].timeStart,
						timeEnd: hours[2].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [4],
				week: 1,
				hours: [
					{
						room: 'В3-09',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Иностранный язык',
		teacher: 'Алдиева Марина Шахидовна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'В4-10',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[2].timeStart,
						timeEnd: hours[2].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [1],
				week: 1,
				hours: [
					{
						room: 'В4-10',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [0],
				week: 1,
				hours: [
					{
						room: 'В3-09',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [3],
				week: 1,
				hours: [
					{
						room: 'В3-10',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Анатомия',
		teacher: 'Умарова Мадина Джандаровна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [1],
				week: 2,
				hours: [
					{
						room: 'Г0-08',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [4],
				week: 2,
				hours: [
					{
						room: 'Г0-08',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [2],
				week: 2,
				hours: [
					{
						room: 'Г0-08',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[2].timeStart,
						timeEnd: hours[2].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [5],
				week: 2,
				hours: [
					{
						room: 'Г0-01',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [2],
				week: 1,
				hours: [
					{
						room: 'Г0-08',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Биология',
		teacher: 'Хасанова Разита Исхаковна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [3],
				week: 2,
				hours: [
					{
						room: 'А2-04 / А2-05',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [3],
				week: 1,
				hours: [
					{
						room: 'А2-04 / А2-05',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[0].timeStart,
						timeEnd: hours[0].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [3],
				week: 1,
				hours: [
					{
						room: 'Б4-07',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[2].timeStart,
						timeEnd: hours[2].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Чеченский язык',
		teacher: 'Мамалова Хоузу Эдилсултановна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [5],
				week: 2,
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [5],
				week: 1,
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Основы Российской Государственности',
		teacher: 'Юсупова Хазан Мусиповна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [3],
				week: 1,
				hours: [
					{
						room: 'Б3-06 / Б3-05',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [5],
				week: 1,
				hours: [
					{
						room: 'Б4-07',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [2],
				week: 2,
				hours: [
					{
						room: 'В3-05',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Физкультура',
		teacher: 'уточнить',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [1],
				week: 1,
				hours: [
					{
						room: 'Спортзал',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [1],
				week: 2,
				hours: [
					{
						room: 'Спортзал',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Латинский язык',
		teacher: 'Магомадова Рукият Вахитовна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [2],
				week: 1,
				hours: [
					{
						room: 'Б3-06',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [3],
				week: 2,
				hours: [
					{
						room: 'Б3-06',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Медицинская информатика',
		teacher: 'Висаитова Бэлла Хадиевна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [0],
				week: 1,
				hours: [
					{
						room: 'Б2-04',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Кураторский час',
		teacher: 'Куратор',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Кураторский час',
				day: [5],
				week: 1,
				hours: [
					{
						room: 'Б3-07',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Экономика',
		teacher: 'Алматова Имани Лачиевна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [5],
				week: 1,
				hours: [
					{
						room: 'Данные отсутствуют',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'Б4-07',
						time: 8,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'История России',
		teacher: 'Товсултанов Рустам Алхазурович',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [0],
				week: 1,
				hours: [
					{
						room: 'В3-09',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
					{
						room: 'В3-09',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [1],
				week: 1,
				hours: [
					{
						room: 'Б4-07',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [4],
				week: 1,
				hours: [
					{
						room: 'В3-09',
						time: 2,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Пара',
				day: [0],
				week: 2,
				hours: [
					{
						room: 'В3-09',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [1],
				week: 1,
				hours: [
					{
						room: 'Б4-07',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Обучение служением',
		teacher: 'Автуев Имран Сулумбекович',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [4],
				week: 1,
				hours: [
					{
						room: 'Г4-02',
						time: 4,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
			{
				type: 'Лекция',
				day: [1],
				week: 2,
				hours: [
					{
						room: 'Г0-01',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
	{
		name: 'Лекарственные растения',
		teacher: 'Джабраилова Лариса Хамзатовна',
		location: 'Медицинский корпус ЧГУ',
		shadules: [
			{
				type: 'Пара',
				day: [5],
				week: 2,
				hours: [
					{
						room: 'Г3-01',
						time: 6,
						group: 'Ст-110',
						timeStart: hours[3].timeStart,
						timeEnd: hours[3].timeEnd,
						dateEnd: '',
					},
				],
			},
		],
	},
]
