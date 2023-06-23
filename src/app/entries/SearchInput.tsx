'use client';

import algoliasearch from 'algoliasearch/lite';
import { useRef, useEffect, MouseEventHandler, useState } from 'react';
import { useInfiniteHits, InstantSearch, SearchBox, Snippet, useInstantSearch } from 'react-instantsearch-hooks-web';
import type { SearchBoxProps } from 'react-instantsearch-hooks-web';

import Image from 'next/image';
import AlgoliaBrand from '../../../public/Algolia-logo-white.svg';

const searchClient = algoliasearch('RUV2926M98', '72d06ce24c99b0d369865bc10b650653');

// interface HitType {
// 	hit: {
// 		title: string;
// 		place: string[];
// 		text: string[];
// 		tags: string[];
// 	};
// }

function Hit({ hit, listRef }) {
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
			if (observerRefValue) {
				observer.unobserve(observerRefValue);
			}
		};
	}, [ref, listRef]);

	return (
		<li ref={ref} className={`ais-InfiniteHits-item ${isVisible ? 'fly-up-fade' : 'invisible'}`}>
			<a
				href={`/entries/${hit.title.replaceAll(' ', '-')}`}
				className="py-4 px-6 block border border-t-[18px] border-primary-orange"
			>
				<h3 className="text-2xl mb-4 font-semibold text-primary-orange">
					<Snippet hit={hit} attribute="title" classNames={{ highlighted: highlightedClasses }} />
				</h3>
				<p className="px-4">
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

function InfiniteHits(props) {
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
			<div className="font-light text-sm ml-2 mb-1">
				{results?.nbHits} {results?.nbHits !== 1 ? 'results' : 'result'}
			</div>
			<ul ref={listRef} className="ais-InfiniteHits-list flex flex-col gap-6 max-h-[38rem] overflow-y-auto px-4">
				{hits.map((hit) => (
					<Hit key={hit.objectID} hit={hit} listRef={listRef} />
				))}
				<li className="mb-4" ref={sentinelRef} aria-hidden="true" />
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

function EmptyQueryBoundary({ children, fallback }) {
	const { indexUiState } = useInstantSearch();

	if (!indexUiState.query) {
		return fallback;
	}

	return children;
}

export default function SearchInput(props) {
	function preventDefault(e) {
		e.stopPropagation();
	}
	return (
		<section onClick={preventDefault} className="text-black flex flex-col items-center w-full relative">
			<InstantSearch searchClient={searchClient} indexName="signalis">
				<fieldset className='w-full relative flex gap-2 justify-center text-white'>
					<SearchBox
						classNames={{
							input:
								'bg-black/80 border border-gray-500 px-4 h-12 w-full rounded-sm focus:outline focus:outline-primary-orange focus:outline-4',
							root: 'w-full mb-12 max-w-xl',
							form: 'relative',
							submit: 'hidden',
							reset: 'hidden',
						}}
						placeholder="Search Memories"
						autoFocus={true}
						queryHook={queryHook}
					/>
					<button onClick={props.clickHandler} className='mt-2 h-min'>
						Close
					</button>
					<div className="absolute text-sm flex gap-2 top-16 max-w-xl w-full justify-end mr-8 ml-auto font-light">
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
