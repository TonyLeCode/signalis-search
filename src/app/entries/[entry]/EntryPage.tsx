'use client';

import { useKeyDown } from '@/hooks';
import { usePagination } from '@/hooks';
import { useState, useRef } from 'react';

export default function EntryPage({ text }: { text: { __html: string }[] }) {
	const totalPages = text.length;

	const { page, next, prev, hasNext, hasPrev } = usePagination(totalPages);
	const [direction, setDirection] = useState<'left' | 'right'>('right');
	const ref = useRef<HTMLParagraphElement>(null);
	useKeyDown(keyHandler);

	function reanimate(element: HTMLElement) {
		element.style.animation = 'none';
		void element.offsetHeight; // Triggers reflow; necessary to make re-animation work.
		element.style.removeProperty('animation');
	}

	function pageChangeHandler(input: 'prev' | 'next') {
		const directionInput = input === 'prev' ? 'left' : 'right';

		if (!ref?.current) return;
		const canChange = directionInput === 'left' ? hasPrev : hasNext;
		if (!canChange) return;

		directionInput === 'left' ? prev() : next();
		setDirection(directionInput);
		reanimate(ref.current);
	}

	function keyHandler(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA':
				pageChangeHandler('prev');
				break;
			case 'ArrowRight':
			case 'KeyD':
				pageChangeHandler('next');
				break;
		}
	}

	return (
		<>
			<p
				ref={ref}
				className={`${
					direction === 'right' ? 'fly-right-fade' : 'fly-left-fade'
				} mb-12	min-h-[13rem] w-full max-w-[51rem] whitespace-pre-line text-base leading-7 sm:mt-12 sm:text-norm`}
				style={{ animationDelay: '100ms' }}
				dangerouslySetInnerHTML={text[page]}
			></p>

			<div
				className="fly-right-fade flex select-none items-center text-base font-light text-white/80 sm:text-norm"
				style={{ animationDelay: '200ms' }}
			>
				<button className={`px-4 py-1 ${!hasPrev ? 'invisible' : ''}`} onClick={() => pageChangeHandler('prev')}>
					{'\u003C'}
				</button>{' '}
				{String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
				<button className={`px-4 py-1 ${!hasNext ? 'invisible' : ''}`} onClick={() => pageChangeHandler('next')}>
					{'\u003E'}
				</button>
			</div>
		</>
	);
}
