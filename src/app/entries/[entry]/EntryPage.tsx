'use client';

import { useEffect, useState, useRef } from 'react';

export default function EntryPage({ text }: { text: { __html: string }[] }) {
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState('right');
	const ref = useRef<HTMLParagraphElement>(null);
	function prev() {
		setPage((current) => {
			if (current !== 0) {
				setDirection('right');
				if (ref?.current) {
					ref.current.style.animation = 'none';
					ref.current.offsetHeight;
					ref.current.style.removeProperty('animation');
				}
				return current - 1;
			}
			return current;
		});
	}
	function next() {
		setPage((current) => {
			if (current !== text.length - 1) {
				setDirection('left');
				if (ref?.current) {
					ref.current.style.animation = 'none';
					ref.current.offsetHeight;
					ref.current.style.removeProperty('animation');
				}
				return current + 1;
			}
			return current;
		});
	}

	useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			switch (e.code) {
				case 'ArrowRight' || 's':
					next();
					break;
				case 'ArrowLeft':
					prev();
					break;
				default:
					break;
			}
		}

		window.addEventListener('keydown', keyHandler);
		return () => {
			window.removeEventListener('keydown', keyHandler);
		};
	}, []);

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
				<button className={`px-4 py-1 ${page == 0 ? 'invisible' : ''}`} onClick={prev}>
					{'\u003C'}
				</button>{' '}
				{String(page + 1).padStart(2, '0')} / {String(text.length).padStart(2, '0')}
				<button className={`px-4 py-1 ${page == text.length - 1 ? 'invisible' : ''}`} onClick={next}>
					{'\u003E'}
				</button>
			</div>
		</>
	);
}
