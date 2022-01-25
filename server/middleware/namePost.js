module.exports = (req, res) => {
	res.send(
		req.post.map(({ id, title, body, createdAt, updatedAt, author }) => ({
			id,
			title,
			body,
			createdAt,
			updatedAt,
			name: author?.show || author.username,
		}))
	);
};
