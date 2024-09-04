import { RefObject, useEffect, useRef, useState } from 'react';

export type IntersectionObserverCallback = (isIntersecting: boolean, observer: IntersectionObserver) => void;

export function useIntersectionObserver(observerOptions: IntersectionObserverInit) {
	const elementsMap = useRef(new Map<Element, IntersectionObserverCallback>());

	const observer = useRef(
		new IntersectionObserver((entries, currentObserver) => {
			entries.forEach((entry) => {
				const callback = elementsMap.current.get(entry.target);
				if (callback) callback(entry.isIntersecting, currentObserver);
			});
		}, observerOptions)
	);

	const useObserve = (ref: RefObject<Element>, callback: IntersectionObserverCallback) => {
		useEffect(() => {
			const currentRef = ref.current;
			if (!currentRef) return;
			elementsMap.current.set(currentRef, callback);
			observer.current.observe(currentRef);
			return () => {
				observer.current.unobserve(currentRef);
				elementsMap.current.delete(currentRef);
			};
		}, [ref, callback]);
	};

	useEffect(() => {
		const currentObserver = observer.current;
		const currentElementsMap = elementsMap.current;
		return () => {
			currentObserver.disconnect();
			currentElementsMap.clear();
		};
	}, []);

	return { useObserve };
}
