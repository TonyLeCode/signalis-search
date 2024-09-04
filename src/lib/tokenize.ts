export function tokenize(text: string): string {
	const rules = [
		{
			pattern: /##([\s\S]*)/gm, // Center lines for entire text
			replacement: '<span class="entry-center">$1</span>',
		},
		{
			pattern: /\$([\s\S]*?)\$/gm, // Ciphered Words
			replacement: '<span class="entry-ciphered">$1</span>',
		},
		{
			pattern: /@([\s\S]*?)@/gm, // Red words
			replacement: '<span class="entry-orange">$1</span>',
		},
		{
			pattern: /#(.*)/gm, // Centered Line
			replacement: '<span class="entry-center">$1</span>',
		},
		{
			pattern: /\*/gm, // Undecipherable
			replacement: '<span class="entry-undecipherable"></span>',
		},
	];

	let formattedText = text;
	rules.forEach((rule) => {
		formattedText = formattedText.replace(rule.pattern, rule.replacement);
	});

	return formattedText;
}
