'use client';

import { useEffect, useRef, useState } from 'react';

interface ItemsProps {
	part: string;
	places: string[];
	found: string[];
	index: number;
}

export default function Accordion({ part, places, found, index }: ItemsProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLUListElement>(null);
	const itemsRef = useRef<HTMLAnchorElement[]>([]);

	useEffect(() => {
		if (ref.current) {
			const scrollHeight = ref.current.scrollHeight;
			const itemHeight = 32;
			const duration = 10 * (scrollHeight / itemHeight) + 140;

			ref.current.style.maxHeight = open ? `${scrollHeight}px` : '';
			ref.current.style.transition = `max-height ${duration}ms ease-in-out`;
		}

		itemsRef.current.forEach((item, index) => {
			if (item) {
				const delay = index * 13; // milliseconds
				item.style.animation = open ? `150ms ease-in ${delay}ms fly-left, 150ms ease-in ${delay}ms fade` : '';
				item.style.animationFillMode = open ? 'both' : '';
			}
		});
	}, [open]);

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
				{places.map((place, i) => {
					return (
						<a
							aria-hidden={!open}
							tabIndex={!open ? -1 : undefined}
							ref={(el: HTMLAnchorElement | null) => {
								if (el) itemsRef.current[i] = el;
							}}
							href={`/entries/${place.replaceAll(' ', '-')}`}
							key={place}
							className="flex flex-col px-4 py-1 text-base hover:bg-primary-red focus:z-10 focus:bg-primary-red focus:outline-none focus:outline sm:flex-row sm:text-norm"
						>
							<div title={place}>
								{place.substring(0, 30)}
								{place.length >= 30 ? '...' : ''}
							</div>
							<div className="text-sm font-light text-white/80 sm:ml-auto sm:text-base">
								{'\u003C'}
								{found[i]}
								{'\u003E'}
							</div>
						</a>
					);
				})}
			</ul>
		</li>
	);
}
