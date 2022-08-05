import { useState, useCallback, useEffect } from "react"

function useAsync<T = any>(callback: Function, dependencies: any[] = []) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [value, setValue] = useState<T | null>(null)

	const callbackMemoized = useCallback(() => {
		setLoading(true)
		setError(null)
		setValue(null)
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false))
	}, dependencies)

	useEffect(() => {
		callbackMemoized()
	}, [callbackMemoized])

	return { loading, error, value }
}

export default useAsync;
