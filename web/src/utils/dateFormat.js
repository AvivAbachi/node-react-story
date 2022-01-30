export default function dateFormat(createdAt, updatedAt) {
	const date = new Date(updatedAt);
	return `${createdAt === updatedAt ? 'Create at' : 'Update at'} ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
