import React, { useState } from 'react';
export default function Comment({
	commentInfo,
	currentUser,
	deleteComment,
	updateComment,
	type,
}) {
	const [editing, setEditing] = useState(false);
	const [commentText, setCommentText] = useState(commentInfo.content);
	const isCurrentUser = currentUser?.username === commentInfo?.user?.username;
	const getUserAvatar = () => {
		return `/images/avatars/image-${commentInfo.user.username}.png`;
	};

	const replyHandler = () => {};

	const editHandler = () => {
		setEditing(true);
	};

	const deleteHandler = () => {
		deleteComment({ id: commentInfo.id, type });
	};

	const updateHandler = () => {
		updateComment({ id: commentInfo.id, type, content: commentText });
		setEditing(false);
	};

	return (
		<>
			<div className='comment'>
				<div className='comment-main'>
					<div className='comment-button'></div>
					<div className='comment-container'>
						<div className='comment-header'>
							<div className='comment-user-avatar'>
								<img
									src={getUserAvatar()}
									alt={`${commentInfo.user.username}-avatar`}
								/>
							</div>
							<div className='comment-user'>{commentInfo.user.username}</div>
							<div
								className={`comment-current-user ${
									!isCurrentUser ? 'display-none' : ''
								}`}>
								you
							</div>

							<div className='comment-time'>{commentInfo.createdAt}</div>
							{/* comment buttons */}
							<div
								className='comment-btn-container'
								style={{ marginLeft: 'auto' }}>
								<div
									className={`comment-btn-reply ${
										isCurrentUser ? 'display-none' : ''
									}`}>
									<button onClick={replyHandler}>
										<img src='/images/icon-reply.svg' alt='reply' /> Reply
									</button>
								</div>
								<div
									className={`comment-btn-edit ${
										!isCurrentUser ? 'display-none' : ''
									}`}>
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
						</div>
						{editing ? (
							<>
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
								<div className='comment-footer'>
									<button onClick={updateHandler}>Update</button>
								</div>
							</>
						) : (
							<div className='comment-content'>{commentInfo.content}</div>
						)}
					</div>
				</div>
			</div>
			{commentInfo.replies?.length > 0 && (
				<div className='replies'>
					{commentInfo.replies.map((reply) => (
						<Comment
							commentInfo={reply}
							type='reply'
							currentUser={currentUser}
							deleteComment={deleteComment}
							updateComment={updateComment}
						/>
					))}
				</div>
			)}
		</>
	);
}
