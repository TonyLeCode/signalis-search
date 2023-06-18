'use client';

import { useState } from 'react';

interface ItemsProps {
	part: string;
	places: string[];
	found: string[];
	index: number;
}

export default function Items({ part, places, found, index }: ItemsProps) {
	const [open, setOpen] = useState(false);
	return (
		<li>
			<button
				onClick={() => {
					setOpen((currentState) => {
						return !currentState;
					});
				}}
				className="font-medium bg-primary-red hover:bg-off-white hover:text-black w-full mb-1 py-0.5"
			>
				{part}
			</button>
			{open === true ? (
				<ul className='mb-1'>
					{places.map((place, i) => {
						return (
							<a href="" key={place} className='flex flex-col px-4 sm:flex-row py-1 text-base sm:text-norm hover:bg-primary-red'>
								<div title={place}>
									{place.substring(0, 30)}
									{place.length >= 30 ? '...' : ''}
								</div>
								<div className='sm:ml-auto font-light text-sm sm:text-base text-white/80'>{'\u003C'}{found[i]}{'\u003E'}</div>
							</a>
						);
					})}
				</ul>
			) : null}
		</li>
	);
}
