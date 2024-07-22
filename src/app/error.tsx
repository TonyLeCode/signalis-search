'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<>
			<h1 className="text-4xl  mt-24 mb-4 font-semibold">Error</h1>
			<p>
				{error.message}.{' '}
				<a href="/" className="text-primary-blue hover:underline hover:text-primary-blue-hover font-medium">
					Go home
				</a>
			</p>
		</>
	);
}
