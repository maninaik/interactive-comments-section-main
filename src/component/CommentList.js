import React from 'react';
import Comment from './Comment';
export default function CommentList({
	comments,
	currentUser,
	deleteComment,
	updateComment,
	addCommentToList,
	updateCommmentScore,
}) {
	comments?.sort((a, b) => b.score - a.score);
	return (
		<div>
			{comments?.map((comment) => (
				<Comment
					key={comment.id}
					type='comment'
					currentUser={currentUser}
					commentInfo={comment}
					deleteComment={deleteComment}
					updateComment={updateComment}
					addCommentToList={addCommentToList}
					parentId={comment.id}
					updateCommmentScore={updateCommmentScore}
				/>
			))}
		</div>
	);
}
