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
		<li>
			<button
				aria-expanded={open}
				onClick={() => {
					setOpen((currentState) => {
						return !currentState;
					});
				}}
				className="font-medium bg-primary-red hover:bg-off-white hover:text-black focus:bg-off-white focus:text-black w-full focus:outline focus:outline-off-white focus:outline-4 focus:outline-offset-2 focus:relative mb-1 py-0.5"
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
							href={`/entries/${place}`}
							key={place}
							className="flex flex-col px-4 sm:flex-row py-1 text-base sm:text-norm hover:bg-primary-red focus:bg-primary-red focus:outline focus:outline-none focus:z-10"
						>
							<div title={place}>
								{place.substring(0, 30)}
								{place.length >= 30 ? '...' : ''}
							</div>
							<div className="sm:ml-auto font-light text-sm sm:text-base text-white/80">
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
