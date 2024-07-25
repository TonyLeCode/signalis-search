'use client';

import algoliasearch from 'algoliasearch/lite';
import { useRef, useEffect, useState, MutableRefObject, ReactNode } from 'react';
import { useInfiniteHits, InstantSearch, SearchBox, Snippet, useInstantSearch } from 'react-instantsearch';
import type { SearchBoxProps, UseInfiniteHitsProps } from 'react-instantsearch';

import Image from 'next/image';
import AlgoliaBrand from '../../../public/Algolia-logo-white.svg';

const searchClient = algoliasearch('RUV2926M98', '72d06ce24c99b0d369865bc10b650653');

function Hit({ hit, listRef }: { hit: any; listRef: MutableRefObject<null> }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLLIElement>(null);
	const highlightedClasses = 'bg-transparent text-primary-blue font-bold';

	useEffect(() => {
		if (!listRef) return;
		let observerRefValue = ref.current;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && observerRefValue) {
					setIsVisible(true);
					observer.unobserve(observerRefValue);
				}
			},
			{ rootMargin: '0px 0px -100px 0px', root: listRef.current, threshold: 0 }
		);
		if (observerRefValue) {
			observer.observe(observerRefValue);
		}
		return () => {
			observer.disconnect();
		};
	}, [ref, listRef]);

	return (
		<li key={hit.objectID} ref={ref} className={`ais-InfiniteHits-item ${isVisible ? 'fly-up-fade' : 'invisible'}`}>
			<a
				href={`/entries/${hit.slug}`}
				className="block border border-t-[18px] border-primary-orange px-3 py-3 sm:px-6 sm:py-4"
			>
				<h3 className="mb-2 text-xl font-semibold text-primary-orange sm:mb-4 sm:text-2xl">
					<Snippet hit={hit} attribute="title" classNames={{ highlighted: highlightedClasses }} />
				</h3>
				<p className="px-4 text-base sm:text-norm">
					<Snippet
						hit={hit}
						attribute="text"
						classNames={{ highlighted: highlightedClasses, nonHighlighted: 'font-light' }}
					/>
				</p>
				{/* <p>${hit.text[0]}</p> */}
				{/* <p>${hit.tags[0]}</p>
      				<p>${hit.place[0]}</p> */}
			</a>
		</li>
	);
}

function InfiniteHits(props: UseInfiniteHitsProps) {
	const { hits, isLastPage, showMore, results } = useInfiniteHits(props);
	const listRef = useRef(null);
	const sentinelRef = useRef(null);

	useEffect(() => {
		if (sentinelRef?.current !== null && listRef?.current !== null) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !isLastPage) {
							showMore();
						}
					});
				},
				{ rootMargin: '50px', root: listRef.current }
			);

			observer.observe(sentinelRef.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [isLastPage, showMore]);

	return (
		<article className="ais-InfiniteHits w-full text-white">
			<div className="mb-1 ml-2 text-sm font-light">
				{results?.nbHits} {results?.nbHits !== 1 ? 'results' : 'result'}
			</div>
			<ul ref={listRef} className="ais-InfiniteHits-list flex flex-col gap-6 overflow-y-auto px-2">
				{hits.map((hit) => (
					<Hit key={hit.objectID} hit={hit} listRef={listRef} />
				))}
				<li key={'sentinel'} className="mb-4" ref={sentinelRef} aria-hidden="true" />
			</ul>
		</article>
	);
}

let debounceTimeoutId: NodeJS.Timeout;

const queryHook: SearchBoxProps['queryHook'] = (query, search) => {
	if (debounceTimeoutId) {
		clearTimeout(debounceTimeoutId);
	}

	debounceTimeoutId = setTimeout(() => {
		search(query);
	}, 200);
};

function EmptyQueryBoundary({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
	const { indexUiState } = useInstantSearch();

	if (!indexUiState.query) {
		return fallback;
	}

	return children;
}

export default function SearchInput(props: { clickHandler: () => void }) {
	function preventDefault(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
	}
	return (
		<section onClick={preventDefault} className="relative flex w-full flex-col items-center text-black">
			<InstantSearch searchClient={searchClient} indexName="signalis" future={{ preserveSharedStateOnUnmount: true }}>
				<fieldset className="relative flex w-full justify-center gap-2 text-white">
					<SearchBox
						classNames={{
							input:
								'bg-black/80 border border-gray-500 px-4 h-12 w-full rounded-sm text-base sm:text-norm focus:outline focus:outline-primary-orange focus:outline-4',
							root: 'w-full mb-12 max-w-xl',
							form: 'relative',
							submit: 'hidden',
							reset: 'hidden',
						}}
						placeholder="Search Memories"
						autoFocus={true}
						queryHook={queryHook}
					/>
					<button onClick={props.clickHandler} className="mt-2 h-min text-base sm:text-norm">
						Close
					</button>
					<div className="absolute top-16 ml-auto mr-8 flex w-full max-w-xl justify-end gap-2 text-xs font-light sm:text-sm">
						Search by <Image width="70" priority src={AlgoliaBrand} alt="powered by algolia" />
					</div>
				</fieldset>
				<EmptyQueryBoundary fallback={null}>
					<InfiniteHits />
				</EmptyQueryBoundary>
			</InstantSearch>
		</section>
	);
}
