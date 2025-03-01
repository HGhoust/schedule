// для получения времени начала лекции с обратным отсчетом
export const updateScheduleTimeStart = (
	timeScheduleStart: number,
	newTime: Date,
	nextDay: boolean = false,
	defaultText: string = '00:00:00'
): string => {
	let now = newTime.getTime()
	let gap = timeScheduleStart - now

	if (nextDay) {
		gap += 24 * 60 * 60 * 1000
	} else if (!nextDay && gap <= 0) {
		return defaultText
	}

	const formatTime = (time: number): string =>
		time < 10 ? `0${time}` : time.toString()

	const hours = formatTime(Math.floor(gap / 1000 / 60 / 60))
	const minutes = formatTime(Math.floor(gap / 1000 / 60) % 60)
	const seconds = formatTime(Math.floor(gap / 1000) % 60)

	return `${hours}ч : ${minutes}м : ${seconds}с`
}

// для получения времени конца лекции с обратным отсчетом
export const updateScheduleTimeEnd = (
	timeScheduleEnd: number,
	newTime: Date,
	nextDay: boolean = false,
	defaultText: string = '00:00:00'
): string => {
	let now = newTime.getTime()
	let gap = timeScheduleEnd - now

	if (nextDay) {
		gap += 24 * 60 * 60 * 1000
	} else if (!nextDay && gap <= 0) {
		return defaultText
	}

	const formatTime = (time: number): string =>
		time < 10 ? '0' + time : time.toString()

	const hours = formatTime(Math.floor(gap / 1000 / 60 / 60))
	const minutes = formatTime(Math.floor(gap / 1000 / 60) % 60)
	const seconds = formatTime(Math.floor(gap / 1000) % 60)

	return `${hours}ч : ${minutes}м : ${seconds}с`
}

export const theWeekDays: string[] = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
]

// получение дней недели начиная с понедельника
export const getCurrentWeek = () => {
	const weekDays = theWeekDays
	const today = new Date()

	// день недели понедельник
	const startOfWeek = new Date(today)
	const dayOfWeek = today.getDay()
	startOfWeek.setDate(today.getDate() - dayOfWeek + 1)

	const weekArray = []

	for (let i = 0; i < 7; i++) {
		const date = new Date(startOfWeek)
		date.setDate(startOfWeek.getDate() + i)

		weekArray.push({
			day: weekDays[date.getDay()],
			date: date.toLocaleDateString('ru-RU'),
		})
	}

	return weekArray
}

// для получения номера недели
export const getWeekNumber = (date: Date): number => {
	// начало семестра
	const semesterStart = (date: Date): Date => {
		const year = date.getFullYear()
		if (date.getMonth() >= 1 && date.getMonth() < 8) {
			// если весенний семестр начинается с первого понедельника февраля
			const febStart = new Date(year, 1, 1)
			const dayOfWeek = febStart.getDay()
			const firstMonday =
				dayOfWeek === 1
					? febStart
					: new Date(year, 1, 1 + ((8 - dayOfWeek) % 7))
			return firstMonday
		} else {
			// если осенний семестр начинается 1 сентября
			const septStart = new Date(year, 8, 1)
			const dayOfWeek = septStart.getDay()
			// 1 сентября выпадает на пятницу, субботу или воскресенье? тогда сдвигаем на следующий понедельник
			const firstMonday =
				dayOfWeek === 1
					? septStart
					: new Date(year, 8, 1 + ((8 - dayOfWeek) % 7))
			return firstMonday
		}
	}

	const startOfYear = semesterStart(date)
	const startOfFirstWeek = new Date(startOfYear)
	const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000

	// номер недели с начала первой недели
	const weekNumber = Math.ceil(
		(date.getTime() - startOfFirstWeek.getTime()) / millisecondsInWeek
	)

	return weekNumber % 2 === 0 ? 2 : 1
}

export const stringToDate = (str: string) => {
	return str.split(':').map(Number)
}
