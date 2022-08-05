import useAsync from "./useAsync"

const DEFAULT_OPTIONS = {
	headers: { "Content-Type": "application/json" }
}

function useFetch(url: string, options: RequestInit = {}, dependencies: any[] = []) {
	return useAsync(async () => {
    try {
      const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options });

      if (response.ok) return response.json();

      const data = await response.json();

      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error)
    }
	}, dependencies)
}

export default useFetch;
