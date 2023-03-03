import { useState } from 'react';

import { deletePost } from '../../../store';
import { Button, Input, Modal } from '../../base';

function DeletePostModal({ postId, onClose }) {
	const [wait, setWait] = useState(false);
	const [error, setError] = useState();

	const handelDelete = async () => {
		setWait(true);
		setError();
		try {
			await deletePost(postId);
			onClose();
		} catch (err) {
			setError(err);
		}
		setWait(false);
	};

	return (
		<Modal.Content>
			<Modal.Header onClose={onClose} title='Delete Post' />
			<Modal.Body>
				<div className='text-center'>
					<p>Deleting this post will be permanently!</p>
				</div>
				{error && (
					<div className='mx-3'>
						<Input.InputError error={error} />
					</div>
				)}
			</Modal.Body>
			<Modal.Footer onClose={onClose}>
				<Button active disabled={wait} onClick={handelDelete}>
					Delete Post
				</Button>
			</Modal.Footer>
		</Modal.Content>
	);
}
export default DeletePostModal;
