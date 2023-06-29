import Accordion from './Accordion';
import Dialog from './Dialog';
import { chapters } from './BrowseData';

export const metadata = {
	title: 'Entries - Signalis Search',
	description: 'Search engine for memories in Signalis',
};

export default function Page() {
	return (
		<>
			<div className="fly-right-fade relative mb-2 mt-12 flex sm:mb-4 sm:mt-24">
				<h1 className="text-3xl font-semibold sm:text-4xl">Entries</h1>
				<Dialog />
			</div>
			{chapters.map((chapter, chapterNum) => {
				return (
					<>
						<h2 className="fly-right-fade mb-2 text-xl font-semibold sm:text-2xl" style={{ animationDelay: '100ms' }}>
							{`Chapter ${chapterNum + 1}: ${chapter.chapter}`}
						</h2>
						<ul className="w-full max-w-xl">
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
