import { useState } from "react"

type UseToggleReturnType = [boolean, (value?: boolean) => void]

function useToggle(defaultValue: boolean): UseToggleReturnType {
	const [value, setValue] = useState(defaultValue)

	function toggleValue(value?: boolean) {
		setValue(currentValue => value ?? !currentValue)
	}

	return [value, toggleValue]
}

export default useToggle;
