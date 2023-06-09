import React, { useState } from 'react';
import CommentBtn from './CommentBtn';
import AddComment from './AddComment';
import '../styles/Comment.css';
import DeleteModal from './DeleteModal';
import timeSince from '../utils/time-since';
import CommentScore from './CommentScore';
export default function Comment({
	commentInfo,
	currentUser,
	deleteComment,
	updateComment,
	type,
	addCommentToList,
	parentId,
	updateCommmentScore,
	replyingTo,
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

	return (
		<>
			<div className='comment'>
				<div className='comment-main'>
					<CommentScore
						id={commentInfo.id}
						type={type}
						score={commentInfo.score}
						updateCommmentScore={updateCommmentScore}
						desktop={true}
					/>

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
								desktop={true}
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
								<div className='comment-edit-footer'>
									<button onClick={updateHandler}>Update</button>
								</div>
							</>
						) : (
							<div className='comment-content'>{commentInfo.content}</div>
						)}
						<div className='comment-footer mobile-only'>
							<CommentScore
								id={commentInfo.id}
								type={type}
								score={commentInfo.score}
								updateCommmentScore={updateCommmentScore}
								desktop={false}
							/>

							<CommentBtn
								isCurrentUser={isCurrentUser}
								replyHandler={replyHandler}
								editHandler={editHandler}
								deleteHandler={deleteHandler}
								desktop={false}
							/>
						</div>
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
						replyingTo={replyingTo}
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
							replyingTo={reply.user.username}
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
