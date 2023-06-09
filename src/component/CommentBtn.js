import React from 'react';

export default function CommentBtn({
	isCurrentUser,
	replyHandler,
	editHandler,
	deleteHandler,
	desktop, // true if for desktop, or false for mobile
}) {
	return (
		<div
			className={`comment-btn-container ${
				desktop ? 'desktop-only' : 'mobile-only'
			}`}>
			<div
				className={`comment-btn-reply ${isCurrentUser ? 'display-none' : ''}`}>
				<button onClick={replyHandler}>
					<img src='/images/icon-reply.svg' alt='reply' /> Reply
				</button>
			</div>
			<div
				className={`comment-btn-edit ${!isCurrentUser ? 'display-none' : ''}`}>
				<button onClick={editHandler}>
					<img src='/images/icon-edit.svg' alt='edit' /> Edit
				</button>
			</div>
			<div
				className={`comment-btn-delete ${
					!isCurrentUser ? 'display-none' : ''
				}`}>
				<button onClick={deleteHandler}>
					<img src='/images/icon-delete.svg' alt='delete' /> Delete
				</button>
			</div>
		</div>
	);
}
