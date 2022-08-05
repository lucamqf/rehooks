import { useRef, useEffect, EffectCallback } from "react"
import deepCompare from "./utils/deepCompare";

function useDeepCompareEffect(callback: EffectCallback, dependencies: Object[]) {
	const currentDependenciesRef = useRef<Object[]>([])

	if (!deepCompare(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current])
}


export default useDeepCompareEffect;
