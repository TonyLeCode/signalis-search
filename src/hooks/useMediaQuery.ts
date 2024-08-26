import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
	const [matchesQuery, setMatchesQuery] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const listener = (event: MediaQueryListEvent) => setMatchesQuery(event.matches);

		mediaQuery.addEventListener('change', listener);

		return () => mediaQuery.removeEventListener('change', listener);
	}, [query]);

	return matchesQuery;
}
