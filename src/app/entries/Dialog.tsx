'use client';

import { useRef, useEffect } from 'react';
import SearchInput from './SearchInput';

export default function Dialog() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	function clickHandler() {
		if (!dialogRef.current) return;

		if (dialogRef.current.open) {
			dialogRef.current.close();
		} else {
			dialogRef.current.showModal();
		}
	}

	function keyHandler(e: KeyboardEvent) {
		switch (e.code) {
			case 'Escape':
				if (!dialogRef.current) return;
				if (dialogRef.current.open) {
					dialogRef.current.close();
				}
				break;
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', keyHandler);
		return () => {
			window.removeEventListener('keydown', keyHandler);
		};
	}, []);

	return (
		<>
			<button onClick={clickHandler} className="absolute -right-12" title={'Click to open search'}>
				<svg
					className="text-primary-red hover:text-off-white"
					width="45"
					height="45"
					version="1.0"
					id="katman_1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 600 450"
				>
					<path
						fill="currentColor"
						d="M394.8,213.5c0,58.9-47.7,106.6-106.6,106.6c-58.9,0-106.6-47.7-106.6-106.6c0-58.9,47.7-106.6,106.6-106.6
	C347.1,106.9,394.8,154.6,394.8,213.5z M412.5,304.3c18.6-25.5,29.6-56.8,29.6-90.8c0-85-68.9-153.9-153.9-153.9
	c-85,0-153.9,68.9-153.9,153.9c0,85,68.9,153.9,153.9,153.9c34,0,65.4-11,90.8-29.6l46.4,46.4c9.2,9.3,24.2,9.3,33.5,0
	c9.3-9.2,9.3-24.2,0-33.5L412.5,304.3z"
					/>
				</svg>
			</button>
			<dialog
				ref={dialogRef}
				onClick={clickHandler}
				className="px-2 max-w-5xl w-full mt-24 bg-transparent backdrop:cursor-pointer backdrop:bg-zinc-950/90"
			>
				<SearchInput />
			</dialog>
		</>
	);
}
