import { transcriptions, memories, subChapters, chapters } from './transcriptions/index';

export function getAllEntrySlugs(): string[] {
	return memories.map((memory) => memory.slug);
}

export function getEntry(slug: string) {
	slug = decodeURIComponent(slug);
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

type BrowseData = {
	chapter: string;
	parts: {
		title: string;
		entries: {
			title: string;
			place: string;
			slug: string;
		}[];
	}[];
}[];

export function getBrowseEntries() {
	const browseData: BrowseData = chapters.map((chapter) => ({ chapter, parts: [] }));

	for (let i = 0; i < transcriptions.length; i++) {
		const partEntries = transcriptions[i].map((memory) => ({
			title: memory?.browseTitle || memory.title,
			place: memory.place[0],
			slug: memory.slug,
		}));

		const chapterIndex = chapters.indexOf(getChapter(i));
		if (chapterIndex !== -1) {
			browseData[chapterIndex].parts.push({ title: subChapters[i], entries: partEntries });
		} else {
			console.error('Error with getting chapter');
		}
	}

	return browseData;
}
