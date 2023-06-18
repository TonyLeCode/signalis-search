'use client';

import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox, Snippet, useInstantSearch } from 'react-instantsearch-hooks-web';
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs';
import type { SearchBoxProps, HitsProps } from 'react-instantsearch-hooks-web';

import Image from 'next/image';
import AlgoliaBrand from '../../../public/Algolia-logo-white.svg';

const searchClient = algoliasearch('RUV2926M98', '72d06ce24c99b0d369865bc10b650653');

interface HitType {
	hit: {
		title: string;
		place: string[];
		text: string[];
		tags: string[];
	};
}

// className='text-white mb-12 grid'

function Hit({ hit }: HitType) {
	const highlightedClasses = 'bg-transparent text-primary-orange font-bold';
	return (
		<a href="" className="py-4 px-6 block border border-t-[18px] border-primary-orange">
			<h3 className="text-2xl mb-4 font-medium">
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

export default function SearchInput() {

	// if (router.isFallback){
	// 	return <div>Loading...</div>
	// }
	return (
		<div className="text-black flex flex-col items-center w-full relative">
			<InstantSearch
				searchClient={searchClient}
				indexName="signalis"
			>
				<SearchBox
					classNames={{
						input:
							'bg-black/80 border border-gray-500 px-4 h-12 w-full max-w-xl m-auto text-white rounded-sm focus:outline focus:outline-primary-orange focus:outline-4',
						root: 'w-full mb-12',
						form: 'flex',
					}}
					placeholder="Search Memories"
					autoFocus={true}
					queryHook={queryHook}
				/>
				<div className="absolute text-sm text-white flex gap-2 top-14 max-w-xl w-full justify-end mr-8 font-light">
					Search by <Image width="70" priority src={AlgoliaBrand} alt="powered by algolia" />
				</div>
				<EmptyQueryBoundary fallback={null}>
					<Hits
						hitComponent={Hit}
						classNames={{
							list: 'text-white flex flex-col gap-6',
							root: 'w-full',
						}}
					/>
				</EmptyQueryBoundary>
			</InstantSearch>
		</div>
	);
}
