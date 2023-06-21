'use client';
import { useEffect, useState } from 'react';

export default function EntryPage({ text }: { text: string[] }) {
	const [page, setPage] = useState(0);
	function prev() {
		setPage((current) => {
			if (current !== 0) {
				return current - 1;
			}
			return current;
		});
	}
	function next() {
		setPage((current) => {
			if (current !== text.length - 1) {
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
			<p className="mt-12 mb-12 min-h-[13rem] whitespace-pre-line max-w-[51rem]">{text[page]}</p>
			<div className="flex items-center font-light text-white/80 select-none">
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
