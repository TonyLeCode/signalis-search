'use client';

import { useEffect, useState, useRef } from 'react';

export default function EntryPage({ text }: { text: string[] }) {
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
				} mt-12 mb-12 min-h-[13rem] whitespace-pre-line max-w-[51rem]`}
				style={{animationDelay:"100ms"}}
			>
				{text[page]}
			</p>
			<div className="fly-right-fade flex items-center font-light text-white/80 select-none" style={{animationDelay:"200ms"}}>
				<button className={`px-3 ${page == 0 ? 'invisible' : ''}`} onClick={prev}>
					{'\u003C'}
				</button>{' '}
				{String(page + 1).padStart(2, '0')} / {String(text.length).padStart(2, '0')}
				<button className={`px-3 ${page == text.length - 1 ? 'invisible' : ''}`} onClick={next}>
					{'\u003E'}
				</button>
			</div>
		</>
	);
}
