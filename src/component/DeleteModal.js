import React from 'react';
import Modal from './Modal';

export default function DeleteModal({
	setShowDeleteModal,
	deleteComment,
	commentInfo,
	type,
}) {
	return (
		<Modal>
			<div className='delete-modal'>
				<div className='modal-header'>Delete Comment</div>
				<div className='modal-content'>
					Are you sure you want to delete this Comment ? This will remove the
					comment and can't be undone
				</div>
				<div className='modal-btn'>
					<button
						className='cancel-btn'
						onClick={() => setShowDeleteModal(false)}>
						NO, CANCEL
					</button>
					<button
						className='delete-btn'
						onClick={() => {
							deleteComment({ id: commentInfo.id, type });
						}}>
						YES, DELETE
					</button>
				</div>
			</div>
		</Modal>
	);
}
