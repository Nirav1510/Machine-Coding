const CITIES = [
	'Mumbai',
	'Delhi',
	'Bengaluru',
	'Hyderabad',
	'Ahmedabad',
	'Chennai',
	'Kolkata',
	'Surat',
	'Pune',
	'Jaipur',
	'Lucknow',
];

export async function searchCities(query, { signal } = {}) {
	await new Promise((r) => setTimeout(r, 300));
	if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 10);
}
