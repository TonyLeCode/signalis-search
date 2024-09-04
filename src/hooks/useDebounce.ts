import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedFunction<T extends (...args: any[]) => any>(fn: T, delay = 500) {
	const timeoutRef = useRef<number>();

	const debouncedFn = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				fn(...args);
			}, delay);
		},
		[fn, delay]
	);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	return debouncedFn;
}
