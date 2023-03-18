const dateHelper = new Date();
const dateSettings = {
	dateStyle: 'short',
	timeStyle: 'medium',
	hour12: false,
};
function formatPost({ date, isEdit, ...post }) {
	dateHelper.setTime(date);
	return {
		...post,
		date:
			(isEdit ? 'Create at: ' : 'Update at: ') +
			dateHelper.toLocaleString(undefined, dateSettings),
	};
}
export default formatPost;
