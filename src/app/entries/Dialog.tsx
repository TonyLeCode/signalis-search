'use client';

import SearchInput from './SearchInput';
import { useDialog } from '@/hooks';

export default function Dialog() {
	const { ref, openDialog, closeDialog } = useDialog();

	return (
		<>
			<button
				onClick={openDialog}
				className="search-button absolute -right-12 sm:mt-1 bg-primary-red text-white hover:bg-off-white hover:text-black rounded-full focus:bg-off-white focus:outline-off-white focus:outline-offset-2 focus:outline-4 focus:outline focus:text-black"
				title={'Click to open search'}
			>
				<svg
					width="36"
					height="36"
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
				ref={ref}
				onClick={closeDialog}
				className="p-2 max-w-5xl w-full mt-2 sm:mt-16 bg-transparent backdrop:cursor-pointer backdrop:bg-zinc-950/90"
			>
				<SearchInput closeHandler={closeDialog} />
			</dialog>
		</>
	);
}
