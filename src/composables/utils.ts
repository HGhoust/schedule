// Функция сокращения имени и отчества
export const resizeNameAndSurname = (string: string): string => {
	const parts = string.split(' ')
	if (parts[1]?.[1] === '.' || parts[1]?.[1] === '-' || string.length <= 10) {
		return string
	}
	return `${parts[0]} ${parts[1]?.[0]}.${parts[2]?.[0]}.`
}

// функция сокращения названия предмета
export const resizeSubjectName = (subjectName: string): string => {
	const parts = subjectName.split(' ')
	if (parts.length < 3) return subjectName

	return `${parts[0][0]}${parts[1][0]}${parts[2][0]}`
}

// для обработки событий клавиш
import { ref } from 'vue'

interface IKeyboardNavigationOptions {
	length: number
	onEnter?: (index: number) => void
	onEscape?: () => void
	onArrowDown?: () => void
	onArrowUp?: () => void
}

export function useKeyboardNavigation(
	options: IKeyboardNavigationOptions,
	activeIndex = ref<number>(0),
	isActive = ref<boolean>(false)
) {
	// обработчик событий клавиш
	const handleKeyDown = (event: KeyboardEvent): void => {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				if (isActive.value) {
					activeIndex.value = (activeIndex.value + 1) % options.length
					options.onArrowDown?.()
				}
				break
			case 'ArrowUp':
				event.preventDefault()
				if (isActive.value) {
					activeIndex.value =
						(activeIndex.value - 1 + options.length) % options.length
					options.onArrowUp?.()
				}
				break
			case 'Enter':
				event.preventDefault()
				options.onEnter?.(activeIndex.value)
				break
			case 'Escape':
				options.onEscape?.()
				break
		}
	}

	return { handleKeyDown }
}
