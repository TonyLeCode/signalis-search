'use client';

import { useEffect, useRef, useState } from 'react';

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		setMatches(window.matchMedia(query).matches)
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const listener = (event:MediaQueryListEvent) => setMatches(event.matches);

		mediaQuery.addEventListener('change', listener);

		return () => mediaQuery.removeEventListener('change', listener);
	}, [query]);

	return matches;
}

interface ItemsProps {
	part: string;
	entries: {
		title: string;
		place: string;
	}[];
	index: number;
}

export default function Accordion({ part, entries, index }: ItemsProps) {
	const [open, setOpen] = useState(false);
	const isMobile = useMediaQuery('(min-width: 640px)');
	const ref = useRef<HTMLUListElement>(null);
	const itemsRef = useRef<HTMLAnchorElement[]>([]);

	useEffect(() => {
		if (ref.current) {
			const reduceMotion = window.matchMedia('(prefers-reduced-motion)').matches;
			const scrollHeight = ref.current.scrollHeight;
			const itemHeight = 32;
			const duration = 10 * (scrollHeight / itemHeight) + 140;

			ref.current.style.maxHeight = open ? `${scrollHeight}px` : '';

			if (reduceMotion) {
				ref.current.style.transition = 'none';
			} else {
				ref.current.style.transition = `max-height ${duration}ms ease-in-out`;
			}
		}

		itemsRef.current.forEach((item, index) => {
			const reduceMotion = window.matchMedia('(prefers-reduced-motion)').matches;
			if (item && !reduceMotion) {
				const delay = index * 13; // milliseconds
				item.style.animation = open ? `150ms ease-in ${delay}ms fly-left, 150ms ease-in ${delay}ms fade` : '';
				item.style.animationFillMode = open ? 'both' : '';
			}
		});
	}, [open, isMobile]);

	return (
		<li className="fly-right-fade" style={{ animationDelay: `${index * 50 + 100}ms` }}>
			<button
				aria-expanded={open}
				onClick={() => {
					setOpen((currentState) => {
						return !currentState;
					});
				}}
				className="mb-1 w-full bg-primary-red py-0.5 text-base font-medium hover:bg-off-white hover:text-black focus:relative focus:bg-off-white focus:text-black focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-off-white sm:text-norm"
			>
				{part}
			</button>

			<ul ref={ref} className={`max-h-0 overflow-hidden ${open ? 'mb-1' : ''}`}>
				{entries.map((entry, i) => {
					return (
						<a
							aria-hidden={!open}
							tabIndex={!open ? -1 : undefined}
							ref={(el: HTMLAnchorElement | null) => {
								if (el) itemsRef.current[i] = el;
							}}
							href={`/entries/${entry.title.replace(/\s/gm, '-')}`}
							key={entry.title}
							className="flex flex-col px-4 py-1 text-base hover:bg-primary-red focus:z-10 focus:bg-primary-red focus:outline-none focus:outline sm:flex-row sm:text-norm"
						>
							<div title={entry.title}>
								{entry.title.substring(0, 30)}
								{entry.title.length >= 30 ? '...' : ''}
							</div>
							<div className="text-sm font-light text-white/80 sm:ml-auto sm:text-base">
								{'\u003C'}
								{entry.place}
								{'\u003E'}
							</div>
						</a>
					);
				})}
			</ul>
		</li>
	);
}
