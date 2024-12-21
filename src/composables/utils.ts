// Функция для того что-бы укоротить инициалы если ширина меньше 330
export const resizeText = (string: string): string => {
	const parts = string.split(' ')
	if (parts[1]?.[1] === '.' || parts[1]?.[1] === '-' || string.length <= 10) {
		return string
	}
	return `${parts[0]} ${parts[1]?.[0]}.${parts[2]?.[0]}.`
}
