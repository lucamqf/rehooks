import { useRef, useEffect } from "react"
import useRenderCount from "./useRenderCount"

type IProps = Record<string, any>

function useDebugInformation(componentName: string, props: IProps) {
	const count = useRenderCount()
	const changedProps = useRef<IProps>({})
	const previousProps = useRef<IProps>(props)
	const lastRenderTimestamp = useRef(Date.now())

	const propKeys = Object.keys({ ...props, ...previousProps })
	changedProps.current = propKeys.reduce((obj, key) => {
		if (props[key] === previousProps.current[key]) return obj

		return {
			...obj,
			[key]: { previous: previousProps.current[key], current: props[key] }
		}
	}, {})

	const info = {
		count,
		changedProps: changedProps.current,
		timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
		lastRenderTimestamp: lastRenderTimestamp.current
	}

	useEffect(() => {
		previousProps.current = props
		lastRenderTimestamp.current = Date.now()
		console.log("[debug-info]", componentName, info)
	})

	return info
}


export default useDebugInformation;
