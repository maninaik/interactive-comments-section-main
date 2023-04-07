import React from 'react';
import Comment from './Comment';
export default function CommentList({
	comments,
	currentUser,
	deleteComment,
	updateComment,
	addCommentToList,
}) {
	return (
		<div>
			{comments.map((comment) => (
				<Comment
					key={comment.id}
					type='comment'
					currentUser={currentUser}
					commentInfo={comment}
					deleteComment={deleteComment}
					updateComment={updateComment}
					addCommentToList={addCommentToList}
					parentId={comment.id}
				/>
			))}
		</div>
	);
}
