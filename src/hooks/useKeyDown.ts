import { useEffect } from 'react';

export function useKeyDown(callback: (e: KeyboardEvent) => void) {
	useEffect(() => {
		window.addEventListener('keydown', callback);
		return () => window.removeEventListener('keydown', callback);
	}, [callback]);
}
