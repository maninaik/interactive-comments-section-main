import { useEffect, useState } from 'react';
import data from './data/data.json';
import './styles/App.css';
import CommentList from './component/CommentList';
import AddComment from './component/AddComment';

function App() {
	const [comments, setComments] = useState(null);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const storedComments = localStorage.getItem('comments');
		storedComments !== null
			? setComments(JSON.parse(localStorage.getItem('comments')))
			: setComments(data.comments);
		setCurrentUser(data.currentUser);
	}, []);

	useEffect(() => {
		if (comments) {
			localStorage.setItem('comments', JSON.stringify(comments));
		}
	}, [comments]);

	const addCommentToList = (comment, type, parentId) => {
		if (type === 'reply') {
			let newComments = [...comments];
			newComments = newComments.map((val) => {
				if (val.id !== parentId) return val;

				return {
					...val,
					replies: [...val.replies, comment],
				};
			});
			setComments(newComments);
			return;
		}
		setComments((prevComments) => [...prevComments, comment]);
	};

	const deleteComment = ({ id, type }) => {
		let filteredComments = [...comments];

		if (type === 'reply') {
			filteredComments.forEach((comment, idx) => {
				const newReplies = comment.replies.filter((val) => val.id !== id);
				filteredComments[idx].replies = newReplies;
			});
		} else {
			filteredComments = filteredComments.filter((val) => val.id !== id);
		}
		setComments(filteredComments);
	};

	const updateComment = ({ id, type, content }) => {
		let filteredComments = [...comments];

		if (type === 'reply') {
			filteredComments.forEach((comment, idx) => {
				const newReplies = comment.replies.map((val) => {
					if (val.id === id) {
						return { ...val, content };
					} else {
						return val;
					}
				});
				filteredComments[idx].replies = newReplies;
			});
		} else {
			filteredComments = filteredComments.map((val) => {
				if (val.id === id) {
					return { ...val, content };
				} else {
					return val;
				}
			});
		}
		setComments(filteredComments);
	};

	// third argument true is increment and false is decrement
	const updateCommmentScore = ({ id, type, increment }) => {
		let filteredComments = [...comments];

		if (type === 'reply') {
			filteredComments.forEach((comment, idx) => {
				const newReplies = comment.replies.map((val) => {
					if (val.id === id) {
						if (increment) return { ...val, score: val.score + 1 };
						else return { ...val, score: val.score - 1 };
					} else {
						return val;
					}
				});
				filteredComments[idx].replies = newReplies;
			});
		} else {
			filteredComments = filteredComments.map((val) => {
				if (val.id === id) {
					if (increment) return { ...val, score: val.score + 1 };
					else return { ...val, score: val.score - 1 };
				} else {
					return val;
				}
			});
		}
		setComments(filteredComments);
	};
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Interactive Comments Section</h1>
			</header>

			<CommentList
				comments={comments}
				currentUser={currentUser}
				deleteComment={deleteComment}
				updateComment={updateComment}
				addCommentToList={addCommentToList}
				updateCommmentScore={updateCommmentScore}
			/>
			<AddComment
				currentUser={currentUser}
				addCommentToList={addCommentToList}
				type='comment'
			/>
		</div>
	);
}

export default App;
