import { useRef } from 'react';
import { useKeyDown } from '@/hooks';

export function useDialog() {
	const ref = useRef<HTMLDialogElement>(null);
	useKeyDown(keyHandler);

	function openDialog() {
		if (!ref.current) return;
		ref.current.showModal();
	}

	function closeDialog() {
		if (!ref.current) return;
		ref.current.close();
	}

	function keyHandler(e: KeyboardEvent) {
		if (!ref.current) return;
    
		switch (e.code) {
			case 'Escape':
				ref.current.close();
				break;
		}
	}

	return { ref, openDialog, closeDialog };
}
