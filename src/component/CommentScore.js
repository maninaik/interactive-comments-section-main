import React from 'react';
import '../styles/CommentScore.css';
export default function CommentScore({
	id,
	type,
	score,
	updateCommmentScore,
	desktop,
}) {
	const incrementScore = () => {
		updateCommmentScore({ id, type, increment: true });
	};

	const decrementScore = () => {
		updateCommmentScore({ id, type, increment: false });
	};
	return (
		<div
			className={`comment-score ${desktop ? 'desktop-only' : 'mobile-only'}`}>
			<button onClick={incrementScore}>
				<img src='/images/icon-plus.svg' alt='' />
			</button>
			<div className='score-view'>{score}</div>
			<button onClick={decrementScore}>
				<img src='/images/icon-minus.svg' alt='' />
			</button>
		</div>
	);
}
