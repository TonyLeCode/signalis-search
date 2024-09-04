import { useCallback, useMemo, useState } from 'react';

// pages are zero based index
// totalPages is one based index
export function usePagination(totalPages: number) {
	const [page, setPage] = useState(0);

	const hasNext = useMemo(() => page < totalPages - 1, [page, totalPages]);
	const hasPrev = useMemo(() => page > 0, [page]);

	const next = useCallback(() => {
		setPage((currentPage) => (hasNext ? currentPage + 1 : currentPage));
	}, [hasNext]);

	const prev = useCallback(() => {
		setPage((currentPage) => (hasPrev ? currentPage - 1 : currentPage));
	}, [hasPrev]);

	return {
		page,
		next,
		prev,
		hasNext,
		hasPrev,
	};
}
