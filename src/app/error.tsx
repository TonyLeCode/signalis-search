'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<>
			<h1 className="text-4xl  mt-24 mb-4 font-semibold">Error</h1>
			<p>
				{error.message}.{' '}
				<Link href="/" className="text-primary-blue hover:text-off-white font-medium">
					Go home
				</Link>
			</p>
		</>
	);
}
