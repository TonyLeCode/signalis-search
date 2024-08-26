import part1 from './transcriptions/Part-1-The Penrose.json';
import part2 from './transcriptions/Part-2-Reeducation.json';
import part3 from './transcriptions/Part-3-Workers.json';
import part4 from './transcriptions/Part-4-Hospital.json';
import part5 from './transcriptions/Part-5-Protektors.json';
import part6 from './transcriptions/Part-6-Excavation.json';
import part7 from './transcriptions/Part-7-Nowhere.json';
import part8 from './transcriptions/Part-8-Memory.json';
import part9 from './transcriptions/Part-9-Rotfront.json';
import part10 from './transcriptions/Part-10-End.json';

type Transcriptions = {
	title: string;
	slug: string;
	part: string;
	place: string[];
	text: string[];
	browseTitle?: string;
}[];

export function getAllEntrySlugs() {
	const transcriptions: Transcriptions[] = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];
	const memories = transcriptions.flat();

	const slugs = memories.map((memory) => {
		return memory.slug;
	});

	return slugs;
}

type BrowseData = {
	chapter: string;
	parts: {
		title: string;
		entries: {
			title: string;
			place: string;
		}[];
	}[];
}[];

export function getEntry(slug: string) {
	slug = decodeURIComponent(slug);
	const transcriptions: Transcriptions[] = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];
	const memories = transcriptions.flat();
	const entry = memories.find((memory) => memory.slug === slug);
	return entry;
}

function getChapter(index: number) {
	if (index <= 4) {
		return 'Synchronicity';
	} else if (index <= 7) {
		return 'Liminality';
	} else {
		return 'Gestaltzerfall';
	}
}

export function getBrowseEntries() {
	const transcriptions: Transcriptions[] = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];

	const parts = [
		'The Penrose',
		'Reeducation',
		'Workers',
		'Hospital',
		'Protektors',
		'Excavation',
		'Nowhere',
		'Memory',
		'Rotfront',
		'End',
	];

	const browseData: BrowseData = [
		{
			chapter: 'Synchronicity',
			parts: [],
		},
		{
			chapter: 'Liminality',
			parts: [],
		},
		{
			chapter: 'Gestaltzerfall',
			parts: [],
		},
	];

	for (let i = 0; i < transcriptions.length; i++) {
		const part = transcriptions[i].map((memory) => {
			if (memory?.browseTitle) {
				return {
					title: memory.browseTitle,
					place: memory.place[0],
				};
			} else {
				return {
					title: memory.title,
					place: memory.place[0],
				};
			}
		});

		const chapter = getChapter(i);
		if (chapter === 'Synchronicity') {
			browseData[0].parts.push({ title: parts[i], entries: part });
		} else if (chapter === 'Liminality') {
			browseData[1].parts.push({ title: parts[i], entries: part });
		} else if (chapter === 'Gestaltzerfall') {
			browseData[2].parts.push({ title: parts[i], entries: part });
		}
	}

	return browseData;
}
