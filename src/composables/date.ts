// для получения времени начала лекции с обратным отсчетом
export const updateSheduleTimeStart = (
	timeSheduleStart: number,
	timestamp: number,
	text: string = '00:00:00'
): string => {
	let now = timestamp
	let gap = timeSheduleStart - now

	let hours: string | number = Math.floor(gap / 1000 / 60 / 60) % 24
	let minutes: string | number = Math.floor(gap / 1000 / 60) % 60
	let seconds: string | number = Math.floor(gap / 1000) % 60

	hours = hours < 10 ? '0' + hours : hours
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return gap > 0 ? `${hours}ч : ${minutes}м : ${seconds}с` : text
}

// для получения времени конца лекции с обратным отсчетом
export const updateSheduleTimeEnd = (
	timeSheduleEnd: number,
	timestamp: number,
	text: string = '00:00:00'
): string => {
	let now = timestamp
	let gap = timeSheduleEnd - now

	let hours: string | number = Math.floor(gap / 1000 / 60 / 60) % 24
	let minutes: string | number = Math.floor(gap / 1000 / 60) % 60
	let seconds: string | number = Math.floor(gap / 1000) % 60

	hours = hours < 10 ? '0' + hours : hours
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return gap > 0 ? `${hours}ч : ${minutes}м : ${seconds}с` : text
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
