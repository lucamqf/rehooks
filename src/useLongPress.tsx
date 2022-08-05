import { RefObject, useEffect } from 'react';
import useTimeout from "./useTimeout";
import useEventListener from "./useEventListener";

function useLongPress(ref: RefObject<Element>, cb: Function, { delay = 250 } = {}) {
	const { reset, clear } = useTimeout(cb, delay)

	useEffect(clear, [])

	useEventListener("mousedown", reset, ref.current)
	useEventListener("touchstart", reset, ref.current)
	useEventListener("mouseup", clear, ref.current)
	useEventListener("mouseleave", clear, ref.current)
	useEventListener("touchend", clear, ref.current)
}


export default useLongPress;
