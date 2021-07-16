const dataFormat = (createdAt, updatedAt) => {
	const notEdit = createdAt === updatedAt ? 'Create at ' : 'Edit at ';
	const fullDate = updatedAt.split(/T|:/g);
	const date = fullDate[0].split('-').reverse().join('/');
	const time = fullDate[1] + ':' + fullDate[2];
	return notEdit + time + ' - ' + date;
};

export default dataFormat;
