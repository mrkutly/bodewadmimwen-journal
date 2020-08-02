enum Color {
	primary100 = 'var(--primary-100)',
	primary200 = 'var(--primary-200)',
	primary300 = 'var(--primary-300)',
	primary400 = 'var(--primary-400)',
	primary500 = 'var(--primary-500)',
}

const colors = [
	Color.primary100,
	Color.primary200,
	Color.primary300,
	Color.primary400,
	Color.primary500,
];

export default (function (): () => Color {
	let available = [...colors];

	return function randomColor(): Color {
		const chosen = available[Math.floor(Math.random() * available.length)];
		available = colors.filter(color => color !== chosen);
		return chosen;
	};
}());