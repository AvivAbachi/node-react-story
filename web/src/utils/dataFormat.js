export default function dataFormat(createdAt, updatedAt) {
	createdAt = createdAt.slice(0, -5);
	updatedAt = updatedAt.slice(0, -5);
	if (createdAt === updatedAt) {
		createdAt = createdAt.split('T');
		return `Create at ${createdAt[1]} ${createdAt[0].split('-').reverse().join('/')}`;
	}
	updatedAt = updatedAt.split('T');
	return `Edit at ${updatedAt[1]} ${updatedAt[0].split('-').reverse().join('/')}`;
}
