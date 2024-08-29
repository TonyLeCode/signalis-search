'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks';

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

	const isMobile = useMediaQuery('(min-width: 640px)'); // We don't compare the boolean, but we check if media query changes to calculate height
	const usesReducedMotion = useMediaQuery('(prefers-reduced-motion)');

	const ref = useRef<HTMLUListElement>(null);
	const itemsRef = useRef<HTMLAnchorElement[]>([]);

	useEffect(() => {
		if (ref.current) {
			const scrollHeight = ref.current.scrollHeight;
			const itemHeight = 32;
			const duration = 10 * (scrollHeight / itemHeight) + 140;

			ref.current.style.setProperty('--max-height', `${open ? scrollHeight : 0}px`);
			ref.current.style.setProperty('--duration', `${duration}ms`);
		}

		itemsRef.current.forEach((item, index) => {
			if (item && !usesReducedMotion) {
				const delay = index * 13; // milliseconds
				item.style.setProperty('--delay', `${delay}ms`);
			}
		});
	}, [open, isMobile, usesReducedMotion]);

	return (
		<li key={part} className="accordion fly-right-fade" style={{ animationDelay: `${index * 50 + 100}ms` }}>
			<button
				aria-expanded={open}
				onClick={() => {
					setOpen((currentState) => {
						return !currentState;
					});
				}}
				className="accordion-button z-0 mb-1 w-full bg-primary-red py-0.5 text-base font-medium hover:bg-off-white hover:text-black focus:relative focus:bg-off-white focus:text-black focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-off-white focus:z-30 sm:text-norm"
			>
				{part}
			</button>

			<ul ref={ref} className={`accordion-ul max-h-0 overflow-hidden ${open ? 'mb-1' : ''}`}>
				{entries.map((entry, i) => {
					return (
						<li key={entry.title + entry.place}>
							<a
								aria-hidden={!open}
								tabIndex={!open ? -1 : undefined}
								ref={(el: HTMLAnchorElement | null) => {
									if (el) itemsRef.current[i] = el;
								}}
								href={`/entries/${entry.title.replace(/\s/gm, '-')}`}
								key={entry.title}
								className={`${open ? 'accordion-item' : ''} flex flex-col px-4 py-1 text-base hover:bg-primary-red focus:z-10 focus:bg-primary-red focus:outline-none focus:outline sm:flex-row sm:text-norm`}
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
						</li>
					);
				})}
			</ul>
		</li>
	);
}
