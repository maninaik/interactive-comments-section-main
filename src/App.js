import { useEffect, useState } from 'react';
import data from './data/data.json';
import './styles/App.css';
import CommentList from './component/CommentList';
import AddComment from './component/AddComment';

function App() {
	const [comments, setComments] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		console.log(data);
		const storedComments = localStorage.getItem('comments');
		storedComments !== null
			? setComments(JSON.parse(localStorage.getItem('comments')))
			: setComments(data.comments);
		setCurrentUser(data.currentUser);
	}, []);

	// useEffect(() => {
	// 	console.log(comments);
	// 	localStorage.setItem('comments', JSON.stringify(comments));
	// }, [comments]);

	const addCommentToList = (comment) => {
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
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Interactive Comments Section</h1>
			</header>

			<CommentList
				comments={comments}
				currentUser={currentUser}
				deleteComment={deleteComment}
			/>
			<AddComment
				currentUser={currentUser}
				addCommentToList={addCommentToList}
			/>
		</div>
	);
}

export default App;
