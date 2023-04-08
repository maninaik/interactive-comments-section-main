import React, { useState } from 'react';
import CommentBtn from './CommentBtn';
import AddComment from './AddComment';
import '../styles/Comment.css';
import DeleteModal from './DeleteModal';
import timeSince from '../utils/time-since';
export default function Comment({
	commentInfo,
	currentUser,
	deleteComment,
	updateComment,
	type,
	addCommentToList,
	parentId,
	updateCommmentScore,
}) {
	const [editing, setEditing] = useState(false);
	const [replying, setReplying] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [commentText, setCommentText] = useState(commentInfo.content);
	const isCurrentUser = currentUser?.username === commentInfo?.user?.username;
	const getUserAvatar = () => {
		return `/images/avatars/image-${commentInfo.user.username}.png`;
	};

	const replyHandler = () => {
		setReplying(true);
	};

	const editHandler = () => {
		setEditing(true);
	};

	const deleteHandler = () => {
		setShowDeleteModal(true);
	};

	const updateHandler = () => {
		updateComment({ id: commentInfo.id, type, content: commentText });
		setEditing(false);
	};

	const incrementScore = () => {
		updateCommmentScore({ id: commentInfo.id, type, increment: true });
	};

	const decrementScore = () => {
		updateCommmentScore({ id: commentInfo.id, type, increment: false });
	};

	return (
		<>
			<div className='comment'>
				<div className='comment-main'>
					{!isCurrentUser && (
						<div className='comment-score'>
							<button onClick={incrementScore}>
								<img src='/images/icon-plus.svg' alt='' />
							</button>
							<div className='score-view'>{commentInfo.score}</div>
							<button onClick={decrementScore}>
								<img src='/images/icon-minus.svg' alt='' />
							</button>
						</div>
					)}
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

							<div className='comment-time'>
								{timeSince(commentInfo.createdAt)}
							</div>
							{/* comment buttons */}
							<CommentBtn
								isCurrentUser={isCurrentUser}
								replyHandler={replyHandler}
								editHandler={editHandler}
								deleteHandler={deleteHandler}
							/>
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
			{showDeleteModal && (
				<DeleteModal
					setShowDeleteModal={setShowDeleteModal}
					deleteComment={deleteComment}
					commentInfo={commentInfo}
					type={type}
				/>
			)}
			<>
				{replying && (
					<AddComment
						currentUser={currentUser}
						addCommentToList={addCommentToList}
						type='reply'
						parentId={parentId}
						setReplying={setReplying}
					/>
				)}
			</>
			{commentInfo.replies?.length > 0 && (
				<div className='replies'>
					{commentInfo.replies.map((reply) => (
						<Comment
							key={reply.id}
							commentInfo={reply}
							type='reply'
							currentUser={currentUser}
							deleteComment={deleteComment}
							updateComment={updateComment}
							addCommentToList={addCommentToList}
							parentId={commentInfo.id}
							updateCommmentScore={updateCommmentScore}
						/>
					))}
				</div>
			)}
		</>
	);
}
