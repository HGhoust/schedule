// для получения времени начала лекции с обратным отсчетом
export const updateScheduleTimeStart = (
	timeScheduleStart: number,
	newTime: Date,
	defaultText: string = '00:00:00'
): string => {
	let now = newTime.getTime()
	let gap = timeScheduleStart - now

	if (gap <= 0) return defaultText

	const formatTime = (time: number): string =>
		time < 10 ? `0${time}` : time.toString()

	const hours = formatTime(Math.floor(gap / 1000 / 60 / 60) % 24)
	const minutes = formatTime(Math.floor(gap / 1000 / 60) % 60)
	const seconds = formatTime(Math.floor(gap / 1000) % 60)

	return `${hours}ч : ${minutes}м : ${seconds}с`
}

// для получения времени конца лекции с обратным отсчетом
export const updateScheduleTimeEnd = (
	timeScheduleEnd: number,
	newTime: Date,
	defaultText: string = '00:00:00'
): string => {
	let now = newTime.getTime()
	let gap = timeScheduleEnd - now

	if (gap <= 0) return defaultText

	const formatTime = (time: number): string =>
		time < 10 ? '0' + time : time.toString()

	const hours = formatTime(Math.floor(gap / 1000 / 60 / 60) % 24)
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
	// получаем начало текущего учебного года проверяя на семестр
	const semester = (date: Date): Date =>
		date < new Date(date.getFullYear(), 1, 8)
			? new Date(date.getFullYear(), 8, 1)
			: new Date(date.getFullYear(), 1, 8)

	const startOfYear: Date = semester(date)
	const dayOfWeek: number = startOfYear.getDay()

	// получаем разницу между днем недели и началом года получая первую неделю по стандарту ISO 8601
	const diff: number = dayOfWeek <= 4 ? dayOfWeek - 1 : dayOfWeek - 8

	// получаем начало первой недели
	const startOfFirstWeek: Date = new Date(startOfYear)
	// устанавливаем дату начала первой недели
	startOfFirstWeek.setDate(startOfYear.getDate() - diff)

	const millisecondsInWeek: number = 7 * 24 * 60 * 60 * 1000
	const weekNumber: number = Math.ceil(
		(date.getTime() - startOfFirstWeek.getTime()) / millisecondsInWeek
	)
	return weekNumber % 2 === 0 ? 2 : 1
}
