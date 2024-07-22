import Accordion from './Accordion';
import Dialog from './Dialog';
import { chapters } from './BrowseData';

export const metadata = {
	title: 'Entries - Kohlibri',
	description: 'Kohlibri is a search engine for Signalis. This is a fan made website to search through memories in Signalis. ',
};

export default function Page() {
	return (
		<>
			<div className="fly-right-fade relative mb-2 mt-4 flex sm:mb-4 sm:mt-20">
				<h1 className="text-3xl font-semibold sm:text-4xl">Entries</h1>
				<Dialog />
			</div>
			{chapters.map((chapter, chapterNum) => {
				return (
					<>
						<h2 className="fly-right-fade mb-2 text-xl font-semibold sm:text-2xl" style={{ animationDelay: '100ms' }}>
							{`Chapter ${chapterNum + 1}: ${chapter.chapter}`}
						</h2>
						<ul className="w-full max-w-xl mb-4">
							{chapter.parts.map((part, i) => {
								return <Accordion key={part.title} part={part.title} entries={part.entries} index={i} />;
							})}
						</ul>
					</>
				);
			})}
		</>
	);
}
