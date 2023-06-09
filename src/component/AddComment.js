import React, { useState } from 'react';
import '../styles/AddComment.css';
export default function AddComment({
	currentUser,
	addCommentToList,
	type,
	parentId,
	setReplying,
	replyingTo,
}) {
	const text = type === 'reply' ? `@${replyingTo} ` : '';
	const [commentText, setCommentText] = useState(text);

	const addCommentHandler = (event) => {
		event.preventDefault();
		if (commentText.trim() === '') return;
		const newComment = {
			id: Math.floor(Math.random() * 100) + 5,
			content: commentText,
			createdAt: new Date().toISOString(), // store date in ISO string
			score: 0,
			username: currentUser.username,
			user: currentUser,
		};

		if (type === 'reply') {
			addCommentToList(newComment, type, parentId);
			setReplying(false);
		} else {
			newComment.replies = [];
			addCommentToList(newComment, type);
		}
		setCommentText('');
	};
	return (
		<form
			className='add-comment-container'
			onSubmit={(e) => addCommentHandler(e)}>
			<div className='add-comment-avatar'>
				<img src={currentUser.image?.png} alt='current user avatar' />
			</div>
			<div className='add-comment-text'>
				<textarea
					name='add-comment'
					id=''
					value={commentText}
					onChange={(e) => {
						setCommentText(e.target.value);
					}}
					rows='5'></textarea>
			</div>
			<div className='add-comment-btn'>
				<button>SEND</button>
			</div>
		</form>
	);
}
