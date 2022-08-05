import { useRef, useEffect } from "react";

function useRenderCount() {
	const count = useRef(1)

	useEffect(() => {
    count.current++
  })

	return count.current
}


export default useRenderCount;
